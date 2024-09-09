# WhatsAppExportedChatDataExtractor
Filters and extracts the content of exported chat data files, to a clean JSON file.

Example:

From:
8/14/24, 3:13 PM - Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Tap to learn more.
8/14/24, 2:57 PM - Penny created group "August 24th "
8/14/24, 3:13 PM - Penny added you
8/14/24, 3:14 PM - Penny: Hi guys! Welcome to the group!!!
8/14/24, 3:18 PM - Berny: yayy! shall we add Amy too?
8/14/24, 3:23 PM - Penny added Amy
8/14/24, 3:23 PM - Amy: Hi
...

To:

[
  {
    "Date": "8/14/24",
    "Time": "3:14 PM",
    "Username": "Penny",
    "Message": "Hi guys! Welcome to the group!!!"
  },
  {
    "Date": "8/14/24",
    "Time": "3:18 PM",
    "Username": "Berny",
    "Message": "yayy! shall we add Amy too?"
  },
  {
    "Date": "8/14/24",
    "Time": "3:23 PM",
    "Username": "Amy",
    "Message": "Hi"
  },
...
]
