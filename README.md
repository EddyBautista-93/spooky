# Spooky 🎃
*Hello Ghouls and Goblins! This is my submission to the ACM Halloween Dev Contest*

## What on earth is Spooky?!
Have you ever been in the mood for a fun horror story? Ever needed to break the ice at a Halloween party? Feeling **Spooky**👻?

Spooky has your back!

Spooky is a web application that uses open AI text and voice generation to create a fun short scary story in 4 sentence or your money back! Pass in any idea or image and let Spooky handle the rest. 

Examples:
> Cat in a mech suit.
> 
> In a town where cats roamed free, one curious feline stumbled upon a shiny mech suit abandoned in a junkyard. Thrilled by the chance to play, she jumped inside, her tiny paws deftly pressing buttons, turning her into a towering terror. The townsfolk watched in awe and dread as she meowed, "I've discovered the purr-fect way to rule the night!" With a playful flick of her tail, she sent the moonlit shadows dancing, leaving the villagers laughing and shrieking in delight.. 

## Whats with the pomodoro timer?
I wanted to find a way to have spooky lofi in the app so why not have a little study session but make it 👻**SPOOKY**👻

## Lets take a deep dive on how this was made!

### __Tech Stack__
- Next.JS 
	- A react framework that is feature rich and the most popular frontend framework when developing web applications with typescript. 
- Tailwind CSS
	- A CSS framework that provides predefined classes with a utility first approach. 
- AWS S3
	- a cloud storage service from Amazon Web Services (AWS) that allows users to store and retrieve data from anywhere
- Open AI SDK 
	- Make API calls and create content with the power of AI 🤖
### __Tools__
- V0 
	- Generate UI with AI to get a prototype up in no time!
- Vercel
	- Vercel allows us to host our web applications in just a few clicks. 

## Application Breakdown 

### Main Page (page.tsx)
In this page we are keeping track of the two main components of the application. Story Generator and and the Pomodoro Timer.
``` typescript
const [showTimer, setShowTimer] = useState(false);
const [showStoryGenerator, setShowStoryGenerator] = useState(false);
``` 
When clicking the button with the text "Tell me a scary story" we hide the pomodoro if its visible and set the state to show story generator to true.

``` typescript 
<button
    onClick={() => {
    setShowStoryGenerator(!showStoryGenerator);
    setShowTimer(false);
    }}
    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
    >
    Tell me a scary story
</button>
```
We use the same logic for the other button with the text "study with me"
``` typescript
<button
    onClick={() => {
    setShowTimer(!showTimer);
    setShowStoryGenerator(false);
    }}
    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
    >
    Study with me
</button>
```

When showStoryGenerator is true, the && expression evaluates to render the <div> and its contents.
When showStoryGenerator is false, the && expression evaluates to false, so React renders nothing for this expression.

``` typescript
{showStoryGenerator && (
  <div className="mb-8 w-full max-w-md">
    <StoryGenerator />
  </div>
)} 
```



### Components
- PomodoroTimer 
	- The timer was something I wanted to add because I loved the ghost animation so much I decided to have a timer with some music to have that with the animation on the screen.
- Ghost 
	- This component is the moving ghost which is basic html with some js and css. 
	


