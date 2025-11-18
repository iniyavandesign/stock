import { auth, db } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    // Redirect if not logged in
    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location = "login.html";
        }
    });

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
        signOut(auth);
    });

    // Add stock
    document.getElementById("addBtn").addEventListener("click", async () => {
        const name = document.getElementById("sname").value;
        const buy = document.getElementById("buy").value;
        const qty = document.getElementById("qty").value;

        await addDoc(collection(db, "stocks"), {
            name,
            buy: Number(buy),
            qty: Number(qty)
        });

        alert("Stock Added");
    });

    // Display stocks
    const list = document.getElementById("list");

    onSnapshot(collection(db, "stocks"), snapshot => {
        list.innerHTML = "";
        snapshot.forEach(doc => {
            let x = doc.data();
            list.innerHTML += `<p><b>${x.name}</b> - Buy: ${x.buy} Qty: ${x.qty}</p>`;
        });
    });

});
