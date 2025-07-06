import json, os
from datetime import datetime, timedelta
from twilio.rest import Client

# ========== TWILIO CONFIG ==========
TWILIO_SID = "AC219d3a33f1e0af6332e52585707cb9c4"
TWILIO_AUTH_TOKEN = "5121ef62b9e494b9cd3c7c4078541616"
TWILIO_FROM = "whatsapp:+14155238886"

# ========== LOAD DOCTOR DATA ==========
with open("doctor_data.json", "r") as f:
    doctors_data = json.load(f)

if os.path.exists("appointments.json"):
    with open("appointments.json", "r") as f:
        appointments = json.load(f)
else:
    appointments = []

# ========== UTILS ==========
def parse_time(time_str):
    return datetime.strptime(time_str.strip(), "%I:%M %p")

def generate_slots(start, end):
    slots = []
    while start + timedelta(minutes=20) <= end:
        slot_end = start + timedelta(minutes=20)
        slots.append(f"{start.strftime('%I:%M %p')} - {slot_end.strftime('%I:%M %p')}")
        start = slot_end
    return slots

def is_doctor_free(doctor_name, date, slot):
    for app in appointments:
        if (app["doctor"] == doctor_name and app["date"] == date and app["slot"] == slot):
            return False
    return True

def get_available_doctors(department, date, time_input):
    available = []
    for dept in doctors_data:
        if dept["department"].lower() == department.lower():
            for doc in dept["doctors"]:
                timing = doc["work_timings"].split("-")
                start = parse_time(timing[0])
                end = parse_time(timing[1])
                all_slots = generate_slots(start, end)

                for slot in all_slots:
                    if time_input in slot:
                        if is_doctor_free(doc["name"], date, slot):
                            available.append((doc, slot))
            break
    return available

def send_confirmation(name, phone, doctor, date, slot):
    client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)
    message = (
        f"✅ Appointment Confirmed!\n\n"
        f"👤 Patient: {name}\n"
        f"🩺 Doctor: {doctor['name']}\n"
        f"🏥 Department: {doctor['department']}\n"
        f"📅 Date: {date}\n"
        f"⏰ Time: {slot}\n\n"
        f"Please arrive 15 minutes early."
    )
    client.messages.create(
        from_=TWILIO_FROM,
        to="whatsapp:" + phone,
        body=message
    )

def save_appointment(patient, phone, doctor, date, slot):
    record = {
        "patient": patient,
        "phone": phone,
        "doctor": doctor["name"],
        "department": doctor["department"],
        "date": date,
        "slot": slot
    }
    appointments.append(record)
    with open("appointments.json", "w") as f:
        json.dump(appointments, f, indent=2)

# ========== MAIN ASSISTANT ==========
def assistant():
    print("👋 Welcome to VitalCare Hospital Assistant!")
    print("I'm here to help you book a doctor.\n")

    while True:
        want_doctor = input("🤖 Do you want to see a doctor? (yes/no): ").strip().lower()
        if want_doctor != "yes":
            print("👋 Take care! See you again.")
            break

        dept = input("🩺 Which department do you want to visit? ").strip().lower()
        date = input("📅 Enter preferred date (YYYY-MM-DD): ").strip()
        try:
            datetime.strptime(date, "%Y-%m-%d")
        except ValueError:
            print("❌ Invalid date format.")
            continue

        time = input("⏰ Enter preferred time (e.g., 02:00 PM): ").strip().upper()
        try:
            datetime.strptime(time, "%I:%M %p")
        except ValueError:
            print("❌ Invalid time format.")
            continue

        available = get_available_doctors(dept, date, time)
        if not available:
            print("😔 Sorry, no doctor is available at that time.")
            continue

        print(f"\n✅ Doctors available in {dept.title()} on {date} at {time}:")
        for i, (doc, slot) in enumerate(available, 1):
            print(f"{i}. {doc['name']} ({doc['position']}, {doc['qualification']}) – Slot: {slot}")

        choice = int(input("\nChoose a doctor by number: ")) - 1
        selected_doc, selected_slot = available[choice]
        selected_doc["department"] = dept.title()

        patient_name = input("👤 Enter your full name: ")
        phone = input("📱 Enter WhatsApp number (e.g., +91xxxxxxxxxx): ").strip()

        save_appointment(patient_name, phone, selected_doc, date, selected_slot)
        send_confirmation(patient_name, phone, selected_doc, date, selected_slot)

        print("✅ Appointment booked and WhatsApp confirmation sent!\n")

if __name__ == "__main__":
    assistant()
