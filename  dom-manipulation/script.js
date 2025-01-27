
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "motivation" },
    {  text: "Happiness is not something ready-made. It comes from your own actions.", category: "happiness" },
    { text: "Talk is cheap. Show me the code.", category: "programming" },
    { text: "Life is what happens when you're busy making other plans.", category: "life" },
    { text: "Why don’t scientists trust atoms? Because they make up everything.", category: "humor" },
  ];
  const quoteDisplay = document.getElementById("quoteDisplay")
  const btn = document.getElementById("newQuote")

  console.log( Math.floor(Math.random()*quotes.length))

  function showRandomQuote(){
   const index = Math.floor(Math.random()*quotes.length)
   const object = quotes[index]
   const p = document.createElement("p")
   const small = document.createElement("small")
   p.textContent = object.text 
   small.textContent = object.category
   quoteDisplay.appendChild(p)
   quoteDisplay.appendChild(small)
  }

  btn.addEventListener("click",showRandomQuote)