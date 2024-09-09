# WhatsAppExportedChatDataExtractor

## Overview

This is is a tool designed to filter and extract content from exported WhatsApp chat data files. It processes raw chat data and converts it into a clean and structured JSON format.

- **Filters**: Excludes irrelevant system messages and group activities.
- **Extracts**: Parses and extracts date, time, username, and message content.
- **Formats**: Outputs the filtered data into a structured JSON array.

## Example

### Input

The tool processes exported chat data in the following format:

```
8/14/24, 3:13 PM - Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Tap to learn more.
8/14/24, 2:57 PM - Penny created group "August 24th"
8/14/24, 3:13 PM - Penny added you
8/14/24, 3:14 PM - Penny: Hi guys! Welcome to the group!!!
8/14/24, 3:18 PM - Berny: yayy! shall we add Amy too?
8/14/24, 3:23 PM - Penny added Amy
8/14/24, 3:23 PM - Amy: Hi
```

### Output

The extracted and formatted JSON data:

```json
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
  }
]
```
