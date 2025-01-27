
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "motivation" },
    {  text: "Happiness is not something ready-made. It comes from your own actions.", category: "happiness" },
    { text: "Talk is cheap. Show me the code.", category: "programming" },
    { text: "Life is what happens when you're busy making other plans.", category: "life" },
    { text: "Why don’t scientists trust atoms? Because they make up everything.", category: "humor" },
  ];
  const quoteDisplay = document.getElementById("quoteDisplay")
  const btn = document.getElementById("newQuote")
  const btn1 = document.getElementById("newQuote")
  

  console.log( Math.floor(Math.random()*quotes.length))

  function showRandomQuote(){
   const index = Math.floor(Math.random()*quotes.length)
   const object = quotes[index]
   quoteDisplay.textContent = ` ${object.text} ${object.category}`
  }

  function createAddQuoteForm(){
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim()
    const newQuoteText= document.getElementById("newQuoteText").value.trim()
   if(newQuoteCategory && newQuoteText){
    quotes.push({text:newQuoteText,category:newQuoteCategory})
    console.log(quotes)
    document.getElementById("newQuoteCategory")= ""
    document.getElementById("newQuoteText")= ""
  }else{
    alert("Please provide all details")
  }

  }

  btn.addEventListener("click",showRandomQuote)
  btn1.addEventListener("click",createAddQuoteForm)