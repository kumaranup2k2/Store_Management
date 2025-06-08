// Sidebar Resizer
const resizer = document.querySelector(".resizer");
const sidebar = document.querySelector(".sidebar");
const container = document.querySelector(".container");

resizer.addEventListener("mousedown", function (e) {
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
});

function resize(e) {
  const newWidth = e.clientX;
  if (newWidth >= 180 && newWidth <= 400) {
    sidebar.style.width = newWidth + "px";
  }
}

function stopResize() {
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResize);
}

// Chatbot Toggle-------------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  // Elements
  const toggleBtn = document.getElementById("chatbotToggle");
  const chatbotContainer = document.getElementById("chatbotContainer");
  const closeBtn = document.getElementById("chatbotCloseBtn");
  const sendBtn = document.getElementById("chatbotSendBtn");
  const inputField = document.getElementById("chatbotInput");
  const messagesContainer = document.getElementById("chatbotMessages");

  // Toggle Chatbot
  toggleBtn.addEventListener("click", () => {
    chatbotContainer.style.display = chatbotContainer.style.display === "flex" ? "none" : "flex";
    inputField.focus();
  });

  // Close Chatbot
  closeBtn.addEventListener("click", () => {
    chatbotContainer.style.display = "none";
  });

  // Send message 
  sendBtn.addEventListener("click", () => {
    sendMessage();
  });

  // Send message on Enter 
  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  // Append message to chat
  function appendMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chatbot-message", sender === "bot" ? "bot-message" : "user-message");
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Sample Q&A Database
  const qaDatabase = [
    { pattern: /hi|hello|hey|namaste|hola|good (morning|afternoon|evening)|hloo|hii|hiii|hiiii|hiiiii|heloo|hlooo|hlloo|hlo/, response: "Namaste! Main hoon Store Assistant. Aapko kis cheez mein madad chahiye?" },
    { pattern: /thank|thanks|thankyou/, response: "Koi baat nahi! 😇 Agar aur kuch puchhna ho to zaroor batayein." },
    { pattern: /bye|goodbye|see you|tata/, response: "Alvida! 🤗 Phir milte hain. Aapka din shubh ho!" },
    { pattern: /help|support|assist|guide/, response: "Main yeh sab mein help kar sakta hoon: product add karna, delete karna, update karna, ya dekhna. Batayein kya karna hai?" },
    { pattern: /add.*product|new.*product/, response: "Naya product add karne ke liye 'Add Product' page par jaakar form bhar dijiye." },
    { pattern: /delete.*product|remove.*product|product delete kaise kre|delete/, response: "Kisi product ko delete karne ke liye 'Delete Product' page par jaakar uska ID daaliye." },
    { pattern: /update.*quantity|edit.*quantity|product update kaise kre|update/, response: "Product quantity update karne ke liye 'Product Quantity Update' page par jaakar details fill kariye." },
    { pattern: /view.*product|product.*detail|list.*product|show.*products|product ka detail kaise nikale|view/, response: "Sare products dekhne ke liye 'Product Detail' page par jaaiye. Wahan sab info milega." },
    { pattern: /price|cost|rate/, response: "Product ka price aapko uske detail page pe milega." },
    { pattern: /contact|customer care/, response: "Contact no.- +91 62xxxxxxxx and Mail id- kumaranup2k2@gmail.com and Instagram- _kumaranup_ and X-kumaranup2k2" }
  ];

  // Generate chatbot response here--------
  function sendMessage() {
    const text = inputField.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    inputField.value = "";

    const lowerText = text.toLowerCase();
    let replyFound = false;

    // Jokes ----------------
    if (/joke|mazak|funny|hansi|ek joke suna do/.test(lowerText)) {
      const jokes = [
        "Ek aadmi doctor ke paas gaya, bola: Doctor saab, mujhe yaadash ki problem hai. Doctor: Kab se? Aadmi: Kab se kya?",
        "Teacher: Agar tumhare paas 10 aam hain, aur tum 2 aam kha lo, toh tumhare paas kitne aam bache? Student: 10 hi, kyunki khane ke baad aam mere muh mein hain!",
        "Ek baar ek smartphone ne doosre smartphone se kaha: Tum itne smart kaise ho? Dusra bola: Bas, thoda software update karwaya hai!",
        "Pati-patni mein jhagda hua. Patni boli: Main tumhare liye itni tension leti hoon, tum mujhe ek rose dena bhi nahi chahte. Pati: Woh toh main har roz khata hoon, chinta mat karo!",
        "Ek aadmi railway station pe bola: Bhaiya, ticket kidhar milega? Bhaiya bola: Yahaan nahi, doosre platform pe. Aadmi: Achha! Tab toh main doosre platform pe hi ruk jaata hoon.",
        "Maa: Beta, homework kar liya? Beta: Homework toh kal karenge, aaj toh mummy ko tension dena hai.",
        "Ek chidiya boli: Mere par nahi hain, par main hawa mein ud sakti hoon. Insaan: Mere paas par nahi hain, par main office mein ud sakta hoon. Life ki baat hai!",
        "Customer: Bhaiya, yeh mobile fast charge karta hai? Dukandaar: Haan sir, bas power chalu hona chahiye.",
        "Boss: Tum office time pe kyun late aaye? Employee: Sir, time machine kharab thi.",
        "Biwi: Tum mujhe bhool gaye? Pati: Nahi, main tumhe bhool nahi sakta. Bas kabhi kabhi main sochta hoon, yaad karoon ya nahi.",
        "Doctor: Aapko kya problem hai? Patient: Doctor saab, jab main chai peeta hoon toh dard hota hai. Doctor: Toh chai na peejiye na.",
        "Santa: Mere paas ek cycle hai. Banta: Accha? Santa: Haan, bas ek hi pedal chalata hoon, doosra thoda break lagta hai.",
        "Pappu ne exam me zero marks liye. Teacher: Pappu, ye kya kiya? Pappu: Sir, maine socha sabse neeche hon toh kam mehnat karna padega.",
        "Friend 1: Tumhara phone kaunsa hai? Friend 2: Baap ka. Friend 1: Matlab? Friend 2: Matlab jisko main istemal karta hoon par bill baap deta hai.",
        "Ek aadmi ATM ke samne khada tha. Usne socha: ATM machine bhi kitni akeli lagti hai, main bhi uski tarah akela hi hoon.",
        "Meri biwi mujhe poochti hai: Tum mere liye kya karoge? Main: TV remote dhoondh kar launga.",
        "Teacher: Beta, tumhare parents kya karte hain? Student: Papa software engineer hain, mummy doctor. Teacher: Bahut achha! Student: Matlab ghar pe tech support aur medical help dono milti hai.",
        "Ek aadmi apne dost se: Yaar, meri biwi itni ziddi hai ki uske saamne toh main khud bhi kuch nahi keh pata.",
        "Jab life tough hoti hai, toh aise socho: Chalo kam se kam chai toh sahi mil rahi hai!",
        "Boss: Tumhara kaam kaisa chal raha hai? Employee: Boss, chal raha toh hai, par rukne ka naam nahi le raha!",
        "Mujhe pata hai tum mujhse pyaar karte ho, warna chatbot ki tarah itni der tak baat nahi karte.",
        "Software engineer ki biwi: Mere liye kuch karoge? Software engineer: Pehle mujhe debug kar lo!",
        "Biwi: Kya tum mujhe ignore kar rahe ho? Pati: Nahi, main multitasking kar raha hoon — tumhe ignore bhi kar raha hoon aur game bhi khel raha hoon.",
        "Santa: Doctor saab, mujhe aisi problem hai ki main apni girlfriend ko bhool nahi pata. Doctor: Toh problem kya hai? Santa: Jab bhi main use bhoolne ki koshish karta hoon, woh aur achi lagne lagti hai!",
        "Teacher: Pappu, tum ghar pe kya karte ho? Pappu: Homework ki practice karta hoon. Teacher: Toh fir school kyun aate ho? Pappu: Taaki school mein bhi practice ho jaye!",
        "Ek aadmi ne apni biwi se kaha: Tumhare bina zindagi adhoori hai. Biwi boli: Matlab? Aadmi bola: Matlab... bill bhi adhoora hai.",
        "Santa ne apne dost se kaha: Mere paas ek secret hai, main lottery jeet gaya hoon! Dost: Kab? Santa: Kabhi nahi, par sochta hoon agar jeet gaya toh kya hoga.",
        "Biwi: Tum mujhe roz kiss kyun nahi karte? Pati: Roz kiss karne se kiss meter kharab ho jata hai.",
        "Ek baar ek aadmi bank gaya aur bola: Mujhe loan chahiye. Bank wala bola: Kitna? Aadmi: Bas itna jitna mera budget ho... matlab zero!",
        "Teacher: Tumhara favorite subject kaunsa hai? Student: Lunch!",
        "Customer: Kya yeh phone waterproof hai? Dukandaar: Haan, par sirf pani pehne se bachao, swimming pool mein nahi!",
        "Pappu: Mere paas do mobile hain. Banta: Wow! Pappu: Nahi, ek mera hai, doosra recharge karne ke liye.",
        "Ek baar ek aadmi doctor ke paas gaya: Doctor saab, mera dost pagal ho gaya hai, woh apne aap se baat karta hai. Doctor: Toh aapko kya problem hai? Aadmi: Mera dost mera dost nahi hai!",
        "Biwi: Tum mujhe kabhi surprise nahi dete. Pati: Surprises toh tumne mujhe diye hain... har bill dekh ke!",
        "Santa: Yaar, mera weight kam karne ka plan hai. Banta: Kaise? Santa: Khana kam karunga... par cake nahi chhodoonga!",
        "Customer: Yeh phone thoda mehenga nahi hai? Dukandaar: Mehenga nahi, premium quality hai. Customer: Matlab, paisa jalana padega!",
        "Teacher: Exam mein sabse important kya hai? Student: Hall ticket.",
        "Boss: Tum itni der kyun late aaye? Employee: Traffic tha boss... Google maps bhi confuse tha!",
        "Biwi: Main shopping par jaa rahi hoon. Pati: Wallet ready karo, armageddon aane wala hai.",
        "Santa: Tumhara office kaisa hai? Banta: Wahan time slow chalta hai, par salary tez gayi hai!",
        "Doctor: Aapko kya pasand hai? Patient: Sahi jawab dena ya joke sunna? Doctor: Dono. Patient: Toh main aapko joke sunata hoon.",
        "Santa: Pichle hafte mera mobile kho gaya. Banta: Kya kiya? Santa: Maa ke paas le gaya, wo sab phone ka number jaanti hain.",
        "Teacher: Pappu, tum homework kyun nahi karte? Pappu: Sir, homework karne mein zindagi barbaad ho jaati hai.",
        "Customer: Yeh phone ki battery kab tak chalegi? Dukandaar: Jab tak charger pass mein ho.",
        "Ek baar ek aadmi apni biwi se bola: Tum meri zindagi ki best investment ho. Biwi: Matlab? Aadmi: Matlab, maintenance zyada lagta hai!",
        "Santa: Tumhara favorite superhero kaun hai? Banta: Internet explorer, kyunki wo hamesha late aata hai!",
        "Biwi: Tum mujhe daily pyar kyun nahi karte? Pati: Kyunki pyar mein regular update chahiye.",
        "Customer: Kya yeh phone selfie ke liye acha hai? Dukandaar: Haan, aap selfie mein bilkul smart lagoge!",
        "Teacher: Pappu, tumhara favorite sport kya hai? Pappu: Sleeping!",
        "Boss: Tumhara kaam kab tak complete hoga? Employee: Jaise deadline pass karta hai, main ussi time tak complete karunga.",
        "Santa: Mere paas ek idea hai. Banta: Kya idea? Santa: Kaam mat karo, phir tension bhi nahi!",
        "Biwi: Tum mujhe kab lekar jaaoge shopping? Pati: Jab tum shopping se thak jaogi!",
        "Customer: Is phone mein game chalenge? Dukandaar: Haan, game chalenge, par aapke skills bhi chalne chahiye.",
        "Teacher: Exam ke liye kaise prepare karte ho? Student: Raat ko neend puri kar ke.",
        "Ek baar ek aadmi apne dost se: Yaar, meri biwi mujhse zyada baat karti hai. Dost: Achha? Aadmi: Haan, kabhi kabhi khud se bhi baat karti hai!",
        "Santa: Tumhari biwi tumse khafa kyun hai? Banta: Kyunki main ghar mein khana banata hoon... use pata nahi chalta!",
        "Biwi: Tum mujhe surprise kab doge? Pati: Jab tum alarm bajayegi, tab!",
        "Customer: Kya phone me camera acha hai? Dukandaar: Haan, selfies itni clear aati hain ki aapko bhi nahi pehchaanoge!",
        "Teacher: Beta, tumhe kya banna hai? Student: Boss.",
        "Boss: Tum itni der kyun late aaye? Employee: Boss, traffic light pe selfie lene ka mood tha.",
        "Santa: Tumhare paas gaadi hai? Banta: Haan, magar parking jagah nahi!",
        "Biwi: Tum itni der kyun TV dekhte ho? Pati: Kyunki remote tumhare haath mein nahi hota!",
        "Customer: Phone mein kya khas hai? Dukandaar: Yeh phone aapke mood ko bhi samajhta hai.",
        "Teacher: Exam ke liye best tip kya hai? Student: Neend puri lena aur waqt par jaagna.",
        "Ek baar ek aadmi apne dost se: Yaar, meri biwi mujhse zyada smart hai. Dost: Kaise? Aadmi: Kyunki woh kabhi galti nahi karti!",
        "Santa: Tumhara office kitna bada hai? Banta: Itna bada ki main kabhi nahi milta!",
        "Biwi: Tum mujhe roz pyaar kyun nahi karte? Pati: Kyunki main roz sochta hoon, par action kam karta hoon.",
        "Customer: Phone mein storage kitna hai? Dukandaar: Aapke sapno ke barabar!",
        "Teacher: Exam mein kaise top karoge? Student: Copy kar ke!",
        "Boss: Tumhara kaam kitna perfect hai? Employee: Jaise mera boss hai, thoda perfect aur thoda realistic.",
        "Santa: Tumhara favorite food kya hai? Banta: Jo khaane mein late na lage!",
        "Biwi: Tum mujhe kab lekar jaaoge holiday par? Pati: Jab budget approve ho jaaye!",
        "Customer: Phone kitna fast hai? Dukandaar: Jaise aapka dimag chal raha ho!",
        "Teacher: Beta, tum homework kab karoge? Student: Jab school band hoga.",
        "Ek baar ek aadmi ne apni biwi se kaha: Tum meri zindagi ho. Biwi: Matlab? Aadmi: Matlab, sab kuch tumhare control mein hai.",
        "Santa: Tumhari biwi tumse kyu naraz hai? Banta: Kyunki main TV remote usse nahi deta!",
        "Biwi: Tum mujhe roz pyar kyun nahi karte? Pati: Kyunki pyar express delivery nahi hota.",
        "Customer: Kya phone waterproof hai? Dukandaar: Haan, par baarish mein use sambhal ke rakho.",
        "Teacher: Tumhara favourite subject kaunsa hai? Student: Lunch break!",
        "Boss: Tum itni der kyun late aaye? Employee: Traffic jam mein phone chala raha tha.",
        "Santa: Tumhare paas gaadi hai? Banta: Haan, par petrol nahi.",
        "Biwi: Tum itni der TV kyun dekhte ho? Pati: Kyunki remote tumhare haath mein nahi.",
        "Customer: Phone mein kya khas hai? Dukandaar: Ye aapko smart dikhata hai.",
        "Teacher: Exam ke liye kya prepare karoge? Student: Neend puri karna.",
        "Ek baar ek aadmi ne apni biwi se kaha: Tum meri zindagi ho. Biwi: Matlab? Aadmi: Matlab, main tumse bina zindagi nahi jee sakta!",
        "Santa: Tumhari biwi tumse kyu naraz hai? Banta: Kyunki main uska khana nahi khata!",
        "Biwi: Tum mujhe roz pyar kyun nahi karte? Pati: Kyunki pyar mein thoda space bhi chahiye.",
        "Customer: Phone waterproof hai? Dukandaar: Haan, par swimming pool mein nahi!",
        "Teacher: Tumhara favourite subject kya hai? Student: Break time!",
        "Boss: Tum itni der kyun late aaye? Employee: Boss, traffic mein phone use kar raha tha.",
        "Santa: Tumhare paas gaadi hai? Banta: Haan, par petrol nahi hai.",
        "Biwi: Tum itni der TV kyun dekhte ho? Pati: Kyunki remote tumhare haath mein nahi hai."
      ];

      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      appendMessage(randomJoke, "bot");
      replyFound = true;
    }

    // Normal Q&A check agar joke nahi mila ----------------
    if (!replyFound) {
      for (let qa of qaDatabase) {
        if (qa.pattern.test(lowerText)) {
          appendMessage(qa.response, "bot");
          replyFound = true;
          break;
        }
      }
    }

    // agar kuch match na ho -----------------
    if (!replyFound) {
      appendMessage("Mujhe samajh nahi aaya 😅. Aap Add, Delete, Update ya View Product ke baare mein puchh sakte hain.", "bot");
    }
  }

  // first message
  appendMessage("Hi! 😊 Main hoon aapka Store Assistant. Kaise madad kar sakta hoon?", "bot");
});
