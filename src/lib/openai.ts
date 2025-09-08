import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true,
})

export async function enrichContact(contact: any) {
  try {
    const prompt = `Given this contact information: ${JSON.stringify(contact)}, 
    suggest improvements and missing information that could be added. 
    Return a JSON object with suggested fields and values.
    Focus on professional information like job title, company size, industry, etc.`

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      temperature: 0.3,
    })

    return JSON.parse(completion.choices[0].message.content || '{}')
  } catch (error) {
    console.error('Error enriching contact:', error)
    return {}
  }
}

export async function generateSequenceContent(purpose: string, contactInfo: any) {
  try {
    const prompt = `Create an email sequence step for ${purpose}. 
    Contact info: ${JSON.stringify(contactInfo)}
    Write a professional, personalized email that's concise and actionable.
    Return only the email content without subject line.`

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
    })

    return completion.choices[0].message.content || ''
  } catch (error) {
    console.error('Error generating content:', error)
    return 'Hello {{firstName}}, \n\nI hope this email finds you well...'
  }
}