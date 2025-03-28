from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

# Utility functions
def isMessage(message: str) -> bool:
    ignore_list = [
        "Messages and calls are end-to-end encrypted.",
        "created this group",
        "created group",
        "<Media omitted>",
        "<This message was edited>",
        "live location shared",
        "null",
        "added you",
    ]
    
    for ignore in ignore_list:
        if ignore in message:
            return False
    return True

def isValidDate(date: str) -> bool:
    try:
        datetime.strptime(date, '%m/%d/%y')
        return True
    except ValueError:
        return False

def isValidTime(time: str) -> bool:
    try:
        datetime.strptime(time, '%I:%M %p')
        return True
    except ValueError:
        return False

def filterUnicode(string: str, replacements: list[tuple[str, str]]) -> str:
    for uni, replace in replacements:
        string = string.replace(uni, replace)
    return string.encode('ascii', 'ignore').decode('ascii')

@app.route('/process_chat', methods=['POST'])
def process_chat():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    file_data = file.read().decode('utf-8').splitlines()

    data = []
    ignored_data = []

    for d in file_data:
        if not isMessage(d):
            ignored_data.append({"Content": d, "Cause": "Not a Message"})
            continue

        d = d.rstrip("\n")
        comma_pos = d.find(",")
        date, rest = d[0:comma_pos], d[comma_pos + 2:]
        dash_pos = rest.find(" -")
        time, rest = rest[0:dash_pos], rest[dash_pos + 3:]
        colon_pos = rest.find(":")
        username, message = rest[0:colon_pos], rest[colon_pos + 2:]

        time = filterUnicode(time, [("\u202f", " ")])
        date = filterUnicode(date, [("\u202f", " ")])

        if not message:
            ignored_data.append({"Content": d, "Cause": "Empty Message"})
            continue

        if not username:
            ignored_data.append({"Content": d, "Cause": "Empty Username"})

        if not isValidDate(date):
            ignored_data.append({"Content": d, "Cause": "Invalid Date"})
            continue

        if not isValidTime(time):
            ignored_data.append({"Content": d, "Cause": "Invalid Time"})
            continue

        message_data = {"Date": date, "Time": time, "Username": username, "Message": message}
        data.append(message_data)

    return jsonify({"extracted_messages": data, "ignored_messages": ignored_data})

if __name__ == '__main__':
    app.run(debug=True)
