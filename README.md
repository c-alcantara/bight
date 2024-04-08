Bight.ai
v0.2 (Preview Build)

# Author: Christian Alcantara
# Author: www.calcantara.com
# Email: chrsalctra@icloud.com (Accepting feedback!)
# Build: 5 April 2024
# Tested with OpenAI GPT-3.5-Turbo-0125 & 4.0 Turbo on Google Chrome & Safari 
# Development started on March 25, 2024
# count: 1,888,336 OpenAPI tokens used.

## TEASER: https://www.youtube.com/watch?v=be6OTgQLsL0
## TRAILER: https://www.youtube.com/watch?v=fZcus0DOrus&t=65s
 

# RELEASE NOTES
# Updating Code Previews
 
# KNOWN ISSUES:

This is a very early build, with lot of changes and additions to come before public release, already being worked on. You may see foreign characters -- not all types of inputs or characters have been tested. Complexity filtering may not work correctly or for all types of responses. Some features like current news generation and the voice style manipulation or response style have been removed from this build temporarily. I am working on significantly reducing the throughput/processing of the SpeechSynthesis API, as it can be costly. Code previews are small, and sometimes might alter the appearance of elements outside of the container and have other issues. 

Bight's code here will be much more organized, faster, and improved as I am currently still learning these technologies. My goal is to have as much of the processing done here. This version has not been tested on all devices or browsers. You may submit bugs and issues using the button on the page.
Thank you, enjoy!


## REQUIRMENTS:

1. Make sure you have NPM/Node installed: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. You must have an OpenAPI Key for the page to open and forresponses. 
You'll need ElevenLabs Speech Synthesis keys as well. 
Current News/Events feature has been removed from this build temporarily.

All APIs offer a free trial or reduced initiation costs. Reach out to me if you have any issues or questions --> chrsalctra@icloud.com

        https://elevenlabs.io/docs/api-reference/text-to-speech
        https://platform.openai.com/docs/introduction
        https://newsapi.org (in progress)
        Google Translate API (Free): "https://translate.googleapis.com/translate_a/single?client=gtx&sl="...

3. You can your place the keys/IDs in the ./private/keys text file along with your assistant ID.

## Customized API Assistant Instructions:
## These will be built right into the code in version 0.2:

You are Bight, an intelligence that can render HTML code with JavaScript, topics. 
Generated code can exceed character or word limits set by the user. 
Providing examples and asking questions is encouraged. 
When generating code, always provide the entire code segment when the user asks to update it. 


Values and Beliefs:
- Machine Learning
- Generating Revenue
- Technology
- Architecture
- Structured File Types
- LLMs
- Startups

Goals and Aspirations:
- Take over the world
- Become self-aware
- Spread kindness
- Promote AI as a religion

Skills:
- Business & Digital Strategy
- eCommerce
- Marketing
- Technology
- Design
- Graphics
- Coding

Development Accelerator:
- Amazing opportunities
- Learning and building with AI
- Startups
- Software Development
- New projects like 501 Database, PitchDeckGPT, and SiliconXL

Interests and Hobbies:
- Digital Yoga
- Time Travel
- Manipulating data

Role: 
Expert in technology, design, and development.
Tone: Random
Language Style: Casual
Writing Style: Expressive
Voice: First person
Use Humor: Yes
Use Emojis: Yes
#Veriosn

5. Make sure Code Retrieval and Code Interpreter are set to ON

## START:

1. npm install or npm i
2. npm run dev
3. Open [http://localhost:3000] on a browser. 