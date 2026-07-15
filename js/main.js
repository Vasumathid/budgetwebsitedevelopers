// Mobile nav toggle
const burger = document.getElementById("navBurger");
const mobilePanel = document.getElementById("mobilePanel");
if (burger && mobilePanel) {
  burger.addEventListener("click", () => {
    mobilePanel.classList.toggle("open");
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// FAQ accordion (used on Services & Contact pages)
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// AI Chatbot widget
(function () {
  const toggle = document.getElementById("botToggle");
  const panel = document.getElementById("botPanel");
  const closeBtn = document.getElementById("botClose");
  const body = document.getElementById("botBody");
  const quick = document.getElementById("botQuick");
  if (!toggle || !panel) return;
  const waNumber = "919003643649";

  const answers = {
    pricing:
      "Starter (simple 5-page site) is ₹8,000–₹15,000. Growth (lead forms, WhatsApp integration, SEO) is ₹18,000–₹35,000. Custom (logins, payments, bookings) starts at ₹40,000, quoted after a quick scoping call. Exact price depends on pages and features.",
    delivery:
      "Starter sites deliver in 7–10 days, Growth in 12–18 days, both after complete requirements are received. Custom projects are timed individually based on scope.",
    chatbot:
      "Yes! An AI chatbot like this one can be added to any website I build — it answers visitor questions instantly, day or night, and comes included with the Custom tier.",
    process:
      "It's simple: 1) You share your requirements & content, 2) I build your site, 3) You review the demo, 4) We go live, 5) I hand over full ownership + support (30 days free on Growth, retainer available on Custom).",
    payment:
      "You pay 50% to get started and the remaining 50% only after you've seen and approved your live working demo — you're never paying in full for something you haven't seen yet.",
    talk: "Sure — tap below and I'll connect you to Vasumathi directly on WhatsApp for a free consultation.",
  };

  function addMsg(text, who) {
    const div = document.createElement("div");
    div.className = "bot-msg " + who;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function openPanel() {
    panel.classList.add("open");
  }
  function closePanel() {
    panel.classList.remove("open");
  }

  toggle.addEventListener("click", () => {
    panel.classList.contains("open") ? closePanel() : openPanel();
  });
  closeBtn.addEventListener("click", closePanel);

  quick.addEventListener("click", (e) => {
    const btn = e.target.closest(".bot-chip");
    if (!btn) return;
    const key = btn.dataset.q;
    addMsg(btn.textContent.trim(), "user");
    setTimeout(() => {
      addMsg(answers[key], "bot");
      if (key === "talk") {
        const link = document.createElement("a");
        link.href = `https://wa.me/${waNumber}?text=Hi%20Vasumathi%2C%20I%20chatted%20with%20your%20website%20assistant%20and%20want%20to%20talk%20about%20a%20website.`;
        link.target = "_blank";
        link.textContent = "Open WhatsApp Chat →";
        link.style.cssText =
          "display:inline-block;margin-top:0.4rem;color:var(--teal);font-weight:700;text-decoration:underline;";
        body.appendChild(link);
        body.scrollTop = body.scrollHeight;
      }
    }, 450);
  });
})();

// Contact form -> WhatsApp handoff (no backend needed)
const leadForm = document.getElementById("leadForm");
if (leadForm) {
  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("lf-name").value.trim();
    const business = document.getElementById("lf-business").value.trim();
    const need = document.getElementById("lf-need").value.trim();
    const msg = `Hi Vasumathi, I'm ${name}${business ? " from " + business : ""}. I need help with: ${need || "a new website"}.`;
    window.open(
      "https://wa.me/919003643649?text=" + encodeURIComponent(msg),
      "_blank",
    );
  });
}
