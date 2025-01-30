
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "motivation" },
    {  text: "Happiness is not something ready-made. It comes from your own actions.", category: "happiness" },
    { text: "Talk is cheap. Show me the code.", category: "programming" },
    { text: "Life is what happens when you're busy making other plans.", category: "life" },
    { text: "Why don’t scientists trust atoms? Because they make up everything.", category: "humor" },
  ];
 
  const btn = document.getElementById("newQuote")
  const btn1 = document.getElementById("newQuote")
  

  function showRandomQuote(){
    const quoteDisplay = document.getElementById("quoteDisplay")
   const index = Math.floor(Math.random()*quotes.length)
   const object = quotes[index]
   const li = document.createElement("li")
    li.append(` ${object.text} ${object.category}`)  
   quoteDisplay.appendChild(li)
  }

  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
  
    if ( newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes(); 
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
        createAddQuoteForm()
      alert("Quote added successfully!");
    } else {
      alert("Please fill in both fields.");
    }
  }
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);

  showRandomQuote();

  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes);
    }
  }

  loadQuotes();

  function exportQuotes() {
    const dataStr = JSON.stringify(quotes);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "quotes.json";
    link.click();
  }

  function importFromJsonFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const importedQuotes = JSON.parse(e.target.result);
      quotes = importedQuotes;
      saveQuotes();
      alert("Quotes imported successfully!");
    };
    reader.readAsText(file);
  }

  function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    const filter = document.getElementById("categoryFilter");
      const li = document.createElement("li")
      li.innerHTML='<option value="all">All Categories</option>'
 
    categories.forEach(category => {
      li.innerHTML += `<option value="${category}">${category}</option>`;
        li.textContent = ${category}
    });
      filter.appendChild(li)
  }

  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = filteredQuotes.map(quote => `<p>"${quote.text}"</p><small>— ${quote.category}</small>`).join("");
  }



  function saveFilterPreference() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory);
  }
  
  function loadFilterPreference() {
    const selectedCategory = localStorage.getItem("selectedCategory") || "all";
    document.getElementById("categoryFilter").value = selectedCategory;
    filterQuotes();
  }
  
  // Call these functions on page load
  loadFilterPreference();
  populateCategories();

  async function fetchQuotesFromServer() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts",{
    method : "POST",
    headers: {Content-Type : "application/json"},
    body : JSON.stringify(quotes)    
    });
    const serverQuotes = await response.json();
      console.log(serverQuotes)
    quotes = serverQuotes.map(post => ({ text: post.title, category: "Server" }));
    saveQuotes();
    populateCategories();
    filterQuotes();
      setInterval(fetchQuotesFromServer, 60000); 
  }

async function syncQuotes() {
    try{
       response = await fetch("https://jsonplaceholder.typicode.com/posts")
       serveQuotes =  response.json()
      // Simulate server quotes (mock data)
      const simulatedServerQuotes = serverQuotes.slice(0, 5).map((post) => ({
        text: post.title,
        category: "Server",
      }));
                    
      // Merge local and server quotes
      const mergedQuotes = mergeQuotes(quotes, simulatedServerQuotes);

      // Update local quotes and save to local storage
      quotes = mergedQuotes;
      saveQuotes();

      // Notify the user
      alert("Quotes synced with server successfully!");
      console.log("Synced quotes:", quotes);
    })}catch(error){
      console.error("Error syncing quotes:", error);
      alert("Failed to sync quotes with server.");
    });
}

function mergeQuotes(localQuotes, serverQuotes) {
  const mergedQuotes = [...localQuotes];

  serverQuotes.forEach((serverQuote) => {
    const existingQuote = localQuotes.find(
      (localQuote) => localQuote.text === serverQuote.text
    );

    if (!existingQuote) {
      // Add new quote from server
      mergedQuotes.push(serverQuote);
    } else {
      // Overwrite local quote with server quote (conflict resolution)
      Object.assign(existingQuote, serverQuote);
    }
  });

  return mergedQuotes;
}
fetchQuotesFromServer()



