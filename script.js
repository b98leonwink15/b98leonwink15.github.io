function toggleDarkMode() {
  const body = document.body;
  const label = document.getElementById("modeLabel");
  const btn = document.getElementById("darkModeBtn");

  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");

  // Text & Icon wechseln
  label.textContent = isDark ? "Light Mode" : "Dark Mode";
  btn.textContent = isDark ? "☀️ " : "🌙 ";
  btn.appendChild(label);

  // Zustand speichern
  localStorage.setItem("darkMode", isDark);
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("expanded");
  localStorage.setItem("sidebarExpanded", sidebar.classList.contains("expanded"));
}

window.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const body = document.body;
  const label = document.getElementById("modeLabel");
  const btn = document.getElementById("darkModeBtn");

  if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark");
    label.textContent = "Light Mode";
    btn.textContent = "☀️ ";
    btn.appendChild(label);
  }

  if (localStorage.getItem("sidebarExpanded") === "true") {
    sidebar.classList.add("expanded");
  }
});
