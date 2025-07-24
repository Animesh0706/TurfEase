from flask import Flask, request, jsonify
import smtplib
from email.message import EmailMessage
import threading
import time
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# === EMAIL CONFIG ===
EMAIL_ADDRESS = 'priyu1040@gmail.com'  # Your Gmail
EMAIL_PASSWORD = 'gqot symo eipm xmzu'  # App Password

# === Fetch Email from Google Apps Script ===
def fetch_email_from_script(name=None, phone=None):
    url = 'https://script.google.com/macros/s/AKfycby4Ho7ISNRU4QlpdUDsRqp4XMJkD8vBJv5_Oh1AEl2uqK1rwHL-JTlEkF0NLhkS3Qs/exec'
    params = {}
    if name:
        params["name"] = name
    if phone:
        params["phone"] = phone

    try:
        response = requests.get(url, params=params)
        data = response.json()
        if data.get("found"):
            return data["email"]
        else:
            print("❌ No matching user found in sheet.")
            return None
    except Exception as e:
        print("❌ Error fetching from Google Script:", e)
        return None

# === Send Email ===
def send_email(to_email, subject, html_content):
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email
    msg.set_content(html_content, subtype='html')

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        print(f"✅ Email sent to {to_email}: {subject}")
    except Exception as e:
        print(f"❌ Error sending email: {e}")

# === Booking Route ===
@app.route('/book', methods=['POST'])
def book():
    data = request.get_json()
    name = data.get('name')
    phone = data.get('phone')

    if not name and not phone:
        return jsonify({"message": "Please provide either name or phone to fetch email."}), 400

    user_email = fetch_email_from_script(name=name, phone=phone)
    if not user_email:
        return jsonify({"message": "User not found in Google Sheet."}), 404

    # Send fixed confirmation email
    send_email(
        user_email,
        "Booking Confirmed!",
        "<p>Your Booking for <b>Bayside Sports Pvt Ltd</b> is Confirmed.</p>"
    )

    return jsonify({"message": "Booking created & confirmation email sent!"})

if __name__ == '__main__':
    app.run(debug=True)
