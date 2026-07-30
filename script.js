(function () {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");
  const hashNavItems = [...navItems].filter((item) => item.getAttribute("href")?.startsWith("#"));
  const counters = document.querySelectorAll("[data-count]");
  const sections = document.querySelectorAll("main section[id]");
  const interactiveCards = document.querySelectorAll(
    ".page-card, .page-hero-card, .about-card, .service-card, .feature-card, .screenshot-card, .contact-card"
  );

  const storageKey = "azure-showcase-theme";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const detailLibrary = {
    "About Project": [
      "Frames the project as a professional cloud case study instead of a basic college assignment.",
      "Explains the project purpose, Azure architecture, and how each layer contributes to a deployable infrastructure story.",
      "Gives recruiters a fast path to understand scope, technical maturity, and presentation quality."
    ],
    "Azure Services": [
      "Summarizes the Azure products used across compute, storage, identity, networking, governance, and observability.",
      "Connects every service to a practical infrastructure benefit so the project reads like a real deployment.",
      "Helps interviewers quickly understand what was configured and why it matters."
    ],
    Features: [
      "Highlights the cloud capabilities that make the project useful: security, scalability, monitoring, hosting, and cost awareness.",
      "Positions the work around professional outcomes rather than isolated screenshots.",
      "Shows how frontend presentation and infrastructure thinking come together in one portfolio-ready experience."
    ],
    "Screenshots Gallery": [
      "Provides polished slots for Azure Portal evidence without leaving the section empty.",
      "Organizes screenshots around real infrastructure views such as Resource Groups, Virtual Machines, networking, monitoring, identity, and cost.",
      "Keeps the project ready for future proof images while still looking complete today."
    ],
    Contact: [
      "Groups professional profile links in one recruiter-friendly area.",
      "Keeps the portfolio path clear with GitHub, LinkedIn, and an email placeholder.",
      "Supports quick follow-up after reviewing the Azure project."
    ],
    "Architecture Snapshot": [
      "Resource Groups provide ownership and lifecycle boundaries for deployed services.",
      "Virtual Network isolates and connects infrastructure components with controlled communication paths.",
      "Entra ID protects access while Azure Monitor supplies operational visibility."
    ],
    Purpose: [
      "Document the Azure project in a way that is visually polished, technically clear, and easy to review.",
      "Show how common cloud services combine into a coherent deployment environment.",
      "Turn infrastructure work into a placement-ready portfolio artifact."
    ],
    Objectives: [
      "Demonstrate resource grouping, cloud networking, access control, storage hosting, monitoring, and cost awareness.",
      "Make the architecture understandable through cards, flow summaries, screenshots, and concise explanations.",
      "Keep the implementation lightweight with HTML, CSS, and vanilla JavaScript."
    ],
    "Architecture Overview": [
      "Users authenticate through identity controls before reaching the protected cloud environment.",
      "Networking defines how resources communicate, while compute and storage provide the workload foundation.",
      "Monitoring closes the loop by surfacing performance, health, and usage signals."
    ],
    "Service Coverage": [
      "Covers six foundational Azure services that map to real cloud infrastructure responsibilities.",
      "Each card explains the service role, project usage, and operational value.",
      "The service set gives recruiters a compact picture of Azure fundamentals."
    ],
    "Azure Virtual Machines": [
      "Provides flexible compute capacity for workloads, testing, and server-side infrastructure practice.",
      "Useful for understanding sizing, OS configuration, networking, access, and operational management.",
      "Represents the compute layer that can be scaled, secured, monitored, and connected to other Azure services."
    ],
    "Azure Storage": [
      "Stores static site assets, blobs, project files, and infrastructure artifacts with high durability.",
      "Supports low-cost hosting and scalable storage patterns suitable for portfolio projects.",
      "Connects directly to static website hosting workflows and clean cloud asset delivery."
    ],
    "Azure Virtual Network": [
      "Creates isolated network boundaries for Azure resources and controls how services communicate.",
      "Supports subnets, address spaces, routing patterns, and future security rules.",
      "Shows awareness of cloud networking fundamentals beyond simply creating resources."
    ],
    "Azure Monitor": [
      "Collects metrics, logs, alerts, and health signals from Azure resources.",
      "Helps detect performance issues, resource problems, and operational trends.",
      "Demonstrates that the project considers maintainability after deployment."
    ],
    "Microsoft Entra ID": [
      "Centralizes identity and access management for users, apps, and cloud resources.",
      "Supports authentication, authorization, role-based access, and secure administrative workflows.",
      "Shows that cloud security starts with identity rather than only network controls."
    ],
    "Resource Groups": [
      "Organize related Azure services into a clear lifecycle and management boundary.",
      "Improve governance through tagging, permissions, cost visibility, and deployment organization.",
      "Make the project easier to explain, maintain, clean up, and scale."
    ],
    "Production Mindset": [
      "Turns the project from a list of services into a practical cloud operations story.",
      "Connects infrastructure choices to security, scale, deployment quality, monitoring, and cost.",
      "Signals that the build was planned for clarity, maintainability, and professional review."
    ],
    "Secure Infrastructure": [
      "Uses identity-aware access concepts and controlled resource boundaries.",
      "Keeps security visible as a design principle rather than an afterthought.",
      "Supports a stronger cloud architecture narrative during interviews."
    ],
    "Scalable Resources": [
      "Highlights cloud resources that can grow with workload demand.",
      "Shows the value of elastic compute, durable storage, and structured resource organization.",
      "Keeps the project aligned with real SaaS infrastructure expectations."
    ],
    "Identity Management": [
      "Explains how Entra ID concepts protect users, applications, and administrators.",
      "Supports role-aware access and centralized authentication thinking.",
      "Gives the project a credible security foundation."
    ],
    "Cloud Monitoring": [
      "Uses observability concepts to track health, metrics, and infrastructure behavior.",
      "Makes the project easier to troubleshoot and reason about after deployment.",
      "Demonstrates operational thinking expected in cloud environments."
    ],
    "Static Website Hosting": [
      "Shows how Azure Storage can serve lightweight static frontend assets.",
      "Fits the project requirement to run locally while still documenting deployable cloud hosting.",
      "Connects frontend polish with a practical Azure delivery path."
    ],
    "Cost Optimization": [
      "Promotes cost visibility through resource grouping, usage awareness, and right-sized services.",
      "Shows a practical understanding that cloud design includes budget and lifecycle discipline.",
      "Helps make the project feel closer to real infrastructure work."
    ],
    "Cloud Networking": [
      "Documents how virtual networks structure communication between cloud resources.",
      "Introduces subnets, isolation, and controlled connectivity as architecture concerns.",
      "Adds depth beyond visual presentation by showing core Azure networking awareness."
    ],
    "Professional Deployment": [
      "Packages the project as a polished static website that opens locally without extra setup.",
      "Uses responsive design, animations, accessibility, and clean file organization.",
      "Makes the Azure work easier for recruiters to review quickly and confidently."
    ],
    "Eight Screenshot Areas": [
      "Creates a complete visual documentation system for the main Azure Portal views.",
      "Keeps each screenshot slot labeled with what evidence belongs there.",
      "Allows the gallery to look complete now while remaining easy to replace with real captures later."
    ],
    "Resource Group": [
      "Use this slot for grouped resources, region, subscription, deployment status, and project organization.",
      "A strong Resource Group screenshot proves that services were created and managed as one environment.",
      "Include tags or cost views if you want to show governance maturity."
    ],
    "Virtual Machine": [
      "Use this slot for VM status, operating system, size, public/private IPs, and networking details.",
      "A VM screenshot demonstrates compute provisioning and infrastructure setup.",
      "Pair it with monitoring or networking screenshots for a stronger story."
    ],
    "Virtual Network": [
      "Use this slot for VNet address space, subnets, DNS, peering, or route configuration.",
      "It proves that the project includes infrastructure connectivity, not just isolated resources.",
      "Useful for explaining how cloud workloads communicate securely."
    ],
    "Storage Account": [
      "Use this slot for storage containers, static website hosting, access tiers, or endpoint settings.",
      "It supports the project story around durable assets and lightweight website hosting.",
      "A configured static website endpoint is especially valuable for portfolio review."
    ],
    "Azure Monitor": [
      "Use this slot for metrics, alerts, activity logs, dashboards, or resource health.",
      "It shows that the project includes operational visibility after deployment.",
      "Monitoring screenshots help interviewers see that the build considers maintenance."
    ],
    "Microsoft Entra ID": [
      "Use this slot for users, groups, app registrations, role assignment, or access control screens.",
      "It demonstrates identity-aware cloud security and centralized access management.",
      "Identity evidence makes the infrastructure story more professional."
    ],
    "Static Website": [
      "Use this slot for the deployed website, Azure static hosting settings, or public endpoint.",
      "It connects the frontend project to Azure delivery.",
      "A final deployed view is a strong closing proof point for recruiters."
    ],
    "Cost Analysis": [
      "Use this slot for cost charts, budgets, forecast views, or resource-level usage.",
      "It shows responsible cloud ownership and cost-awareness.",
      "Cost context helps turn a technical project into an operationally mature one."
    ],
    "Professional Links": [
      "GitHub gives recruiters access to code, structure, and implementation decisions.",
      "LinkedIn gives a direct professional profile path for follow-up.",
      "The email placeholder can be replaced when you are ready to publish the site."
    ],
    "Azure Cloud Infrastructure & Services": [
      "Aayan Kumar's cloud project showcase combines Azure infrastructure concepts with a premium static frontend.",
      "The contact card is designed for placement review, interviews, and portfolio sharing.",
      "Replace the placeholder email before publishing publicly."
    ]
  };

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    return prefersDark.matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeIcon) {
      themeIcon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  function closeMobileNav() {
    document.body.classList.remove("nav-open");
    navLinks?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }

  function updateHeaderState() {
    header?.classList.toggle("scrolled", window.scrollY > 18);
  }

  function animateCounter(counter) {
    const target = Number(counter.dataset.count || "0");
    const suffix = target === 100 ? "%" : "+";
    const duration = 900;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.round(target * eased)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function closestElement(target, selector) {
    return target instanceof Element ? target.closest(selector) : null;
  }

  function getCardTitle(card) {
    return card.querySelector("h3, h2")?.textContent.trim() || card.getAttribute("aria-label") || "Project detail";
  }

  function getCardSummary(card) {
    return card.querySelector("p")?.textContent.trim() || "Detailed project information for this Azure showcase item.";
  }

  function getCardIcon(card) {
    return (
      card.querySelector(".card-icon")?.className ||
      card.querySelector(".service-icon i, .feature-card > i, .placeholder-visual i")?.className ||
      "fa-solid fa-circle-info"
    );
  }

  function createModal() {
    const modal = document.createElement("div");
    modal.className = "modal-root";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "modal-title");
    modal.innerHTML = `
      <div class="modal-backdrop" data-modal-close></div>
      <article class="modal-panel" tabindex="-1">
        <button class="modal-close" type="button" aria-label="Close dialog" data-modal-close>
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
        <div class="modal-content"></div>
      </article>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  const modalRoot = createModal();
  const modalPanel = modalRoot.querySelector(".modal-panel");
  const modalContent = modalRoot.querySelector(".modal-content");
  let lastFocusedElement = null;

  function closeModal() {
    if (modalRoot.hidden) return;

    modalRoot.hidden = true;
    modalPanel.classList.remove("image-modal");
    document.body.classList.remove("modal-open");
    lastFocusedElement?.focus?.();
  }

  function openModal(content, isImage = false) {
    lastFocusedElement = document.activeElement;
    modalContent.innerHTML = content;
    modalPanel.classList.toggle("image-modal", isImage);
    modalRoot.hidden = false;
    document.body.classList.add("modal-open");
    modalPanel.focus();
  }

  function buildDetailModal(card) {
    const title = getCardTitle(card);
    const summary = getCardSummary(card);
    const details = detailLibrary[title] || [summary, "This item belongs to the Azure Cloud Infrastructure & Services project showcase."];
    const icon = getCardIcon(card);
    const href = card.matches("a.page-card") ? card.getAttribute("href") : "";
    const action = href
      ? `<a class="btn btn-primary modal-action" href="${escapeHTML(href)}"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i>Open Page</a>`
      : "";

    return `
      <p class="modal-kicker"><i class="${escapeHTML(icon)}" aria-hidden="true"></i>Project detail</p>
      <h2 class="modal-title" id="modal-title">${escapeHTML(title)}</h2>
      <p class="modal-summary">${escapeHTML(summary)}</p>
      <ul class="modal-list">
        ${details.map((detail) => `<li>${escapeHTML(detail)}</li>`).join("")}
      </ul>
      ${action}
    `;
  }

  function buildImageModal(card, image) {
    const title = getCardTitle(card);
    const summary = getCardSummary(card);
    const details = detailLibrary[title] || [summary];

    return `
      <div class="modal-image-wrap">
        <img src="${escapeHTML(image.getAttribute("src"))}" alt="${escapeHTML(image.getAttribute("alt") || title)}">
      </div>
      <h2 class="modal-title" id="modal-title">${escapeHTML(title)}</h2>
      <p class="modal-summary">${escapeHTML(summary)}</p>
      <ul class="modal-list">
        ${details.map((detail) => `<li>${escapeHTML(detail)}</li>`).join("")}
      </ul>
    `;
  }

  function trapModalFocus(event) {
    if (modalRoot.hidden || event.key !== "Tab") return;

    const focusable = modalRoot.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  applyTheme(getPreferredTheme());

  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  navItems.forEach((item) => {
    const href = item.getAttribute("href") || "";
    const hrefFile = href.split("#")[0] || "index.html";
    item.classList.toggle("active", hrefFile === currentFile);
  });

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  });

  prefersDark.addEventListener("change", (event) => {
    if (!localStorage.getItem(storageKey)) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks?.classList.toggle("open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  navItems.forEach((item) => {
    item.addEventListener("click", closeMobileNav);
  });

  modalRoot.addEventListener("click", (event) => {
    if (closestElement(event.target, "[data-modal-close]")) {
      closeModal();
    }
  });

  interactiveCards.forEach((card) => {
    const title = getCardTitle(card);
    const isLinkCard = card.matches("a.page-card");

    card.classList.add(card.classList.contains("screenshot-card") ? "image-trigger" : "detail-trigger");
    card.setAttribute("aria-haspopup", "dialog");

    if (!isLinkCard) {
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
    }

    if (!card.getAttribute("aria-label")) {
      card.setAttribute("aria-label", `Open details for ${title}`);
    }

    card.addEventListener("click", (event) => {
      if (closestElement(event.target, ".contact-actions a")) return;
      if (isLinkCard) event.preventDefault();

      const image = closestElement(event.target, "img");
      if (card.classList.contains("screenshot-card") && image) {
        openModal(buildImageModal(card, image), true);
        return;
      }

      openModal(buildDetailModal(card));
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (closestElement(event.target, ".contact-actions a")) return;

      event.preventDefault();
      const image = card.querySelector("img");
      if (card.classList.contains("screenshot-card") && image) {
        openModal(buildImageModal(card, image), true);
        return;
      }

      openModal(buildDetailModal(card));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      closeMobileNav();
    }

    trapModalFocus(event);
  });

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  updateHeaderState();

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.55 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  if (hashNavItems.length && sections.length) {
    const activeNavObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          hashNavItems.forEach((item) => {
            item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: 0 }
    );

    sections.forEach((section) => activeNavObserver.observe(section));
  }

  window.addEventListener(
    "mousemove",
    (event) => {
      const visual = document.querySelector(".hero-visual");
      if (!visual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      visual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    { passive: true }
  );

  const currentYear = document.getElementById("current-year");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (window.AOS) {
    AOS.init({
      duration: 820,
      easing: "ease-out-cubic",
      once: true,
      offset: 80
    });
  }
})();
