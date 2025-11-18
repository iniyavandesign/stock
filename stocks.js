function logout() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    });
}

// Add stock
function addStock() {
    let name = document.getElementById("stockName").value;
    let buy = parseFloat(document.getElementById("buyPrice").value);
    let qty = parseFloat(document.getElementById("quantity").value);

    if (!name || !buy || !qty) {
        alert("Fill all fields");
        return;
    }

    db.collection("stocks").add({
        name: name,
        buyPrice: buy,
        quantity: qty,
        createdAt: new Date()
    });

    document.getElementById("stockName").value = "";
    document.getElementById("buyPrice").value = "";
    document.getElementById("quantity").value = "";
}

// Live price fetcher (free API)
async function getLivePrice(symbol) {
    try {
        let url = `https://script.google.com/macros/s/AKfycbxG5XG8HUP9IMI3lAnFf4w0Vodbmf-xZitvmNb6hD0SSq7X3mm59lORefWcckCQwKUu4g/exec`;
        let res = await fetch(url);
        let json = await res.json();
        return json.data.price || "N/A";
    } catch {
        return "N/A";
    }
}

// Load stocks
db.collection("stocks").orderBy("createdAt", "desc").onSnapshot(async snapshot => {
    let list = document.getElementById("stockList");
    list.innerHTML = "";

    snapshot.forEach(async doc => {
        let data = doc.data();
        let livePrice = await getLivePrice(data.name);
        
        let profit = (livePrice - data.buyPrice) * data.quantity;

        list.innerHTML += `
            <div class="stock-box">
                <b>${data.name}</b><br>
                Buy Price: ₹${data.buyPrice}<br>
                Quantity: ${data.quantity}<br>
                Live Price: ₹${livePrice}<br>
                <b style="color:${profit>=0?'green':'red'}">P/L: ₹${profit.toFixed(2)}</b><br><br>
                <button onclick="deleteStock('${doc.id}')">Delete</button>
            </div>
        `;
    });
});

// Delete stock
function deleteStock(id) {
    db.collection("stocks").doc(id).delete();
}
