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
      "Starter (essential online presence) starts at ₹18,000. Growth (lead forms, WhatsApp integration, SEO) starts at ₹30,000. Custom (logins, payments, bookings) starts at ₹80,000, quoted after a quick scoping call. Mobile apps are quoted separately based on your requirements. Every price depends on the functionality you need, not the number of pages.",
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

// Tilt + glow profile card — vanilla-JS adaptation of the React Bits
// ProfileCard interaction (pointer-tracked 3D tilt + radial glow),
// re-themed to this site's marigold/teal palette instead of the
// component's default purple-blue holographic look.
(function () {
  const wraps = document.querySelectorAll(".tilt-card-wrap");
  if (!wraps.length) return;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reduceMotion) return;

  const MAX_TILT = 9;

  wraps.forEach((wrap) => {
    const card = wrap.querySelector(".tilt-card");
    if (!card) return;

    function onMove(e) {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      const py = Math.min(Math.max((y / rect.height) * 100, 0), 100);
      const rotateY = ((x / rect.width) - 0.5) * MAX_TILT * 2;
      const rotateX = -((y / rect.height) - 0.5) * MAX_TILT * 2;
      card.style.transition = "none";
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      wrap.style.setProperty("--mx", px + "%");
      wrap.style.setProperty("--my", py + "%");
      wrap.classList.add("tc-active");
    }

    function onLeave() {
      card.style.transition = "";
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
      wrap.classList.remove("tc-active");
    }

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointercancel", onLeave);
  });
})();

// Spotlight hover cards — vanilla-JS adaptation of the React Bits
// SpotlightCard pattern, used on proof/portfolio/pricing cards.
(function () {
  const cards = document.querySelectorAll(".spot-card");
  if (!cards.length) return;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reduceMotion) return;

  cards.forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty(
        "--sx",
        ((e.clientX - rect.left) / rect.width) * 100 + "%",
      );
      el.style.setProperty(
        "--sy",
        ((e.clientY - rect.top) / rect.height) * 100 + "%",
      );
    });
  });
})();

// ---------- HERO ROTATING WORD ----------
(function () {
  const el = document.getElementById("rotateWord");
  if (!el) return;

  const words = ["School", "College", "Cafe", "Restaurant", "Shop", "Startup", "Clinic", "Business"];
  let i = 0;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reduceMotion) return;

  setInterval(() => {
    el.classList.add("swap");
    setTimeout(() => {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.remove("swap");
    }, 350);
  }, 2200);
})();
