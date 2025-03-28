interface WhatsAppMessage {
  timestamp: string
  sender: string
  message: string
}

export function parseWhatsAppChat(text: string): WhatsAppMessage[] {
  const lines = text.split("\n")
  const messages: WhatsAppMessage[] = []
  let currentMessage: Partial<WhatsAppMessage> | null = null

  // Regular expression to match WhatsApp message format
  // Matches patterns like: [DD/MM/YY, HH:MM:SS] Sender Name: Message content
  const messageRegex = /^\[?(\d{1,2}\/\d{1,2}\/\d{2,4},?\s\d{1,2}:\d{2}(?::\d{2})?(?:\s[AP]M)?)\]?\s-\s([^:]+):\s(.+)$/

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const match = line.match(messageRegex)

    if (match) {
      // If we have a current message being built, push it to the array
      if (currentMessage && currentMessage.timestamp && currentMessage.sender && currentMessage.message) {
        messages.push(currentMessage as WhatsAppMessage)
      }

      // Start a new message
      currentMessage = {
        timestamp: match[1],
        sender: match[2].trim(),
        message: match[3],
      }
    } else if (currentMessage) {
      // This line is a continuation of the previous message
      currentMessage.message += "\n" + line
    }
  }

  // Don't forget to add the last message
  if (currentMessage && currentMessage.timestamp && currentMessage.sender && currentMessage.message) {
    messages.push(currentMessage as WhatsAppMessage)
  }

  return messages
}

