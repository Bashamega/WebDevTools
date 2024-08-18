"use client";
import React, { useState, useEffect } from "react";
import { NavBar } from "@/app/components/navbar";

const InputForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    subtitles: "",
    bio: "",
    email: "",
    linkedin: "",
    twitter: "",
    portfolio: "",
    buyMeACoffee: "",
    kofi: "",
    skills: "",
    githubUsername: "",
    location: "",
    portfolioTitle: "",
    additionalInfo: "",
    workingOnTitle: "",
    learning: "",
    collaborateOn: "",
  });

  const skillsIcons = {
    html: "html",
    css: "css",
    vscode: "vscode",
    github: "github",
    figma: "figma",
    git: "git",
    postman: "postman",
    vercel: "vercel",
    netlify: "netlify",
    materialui: "materialui",
    tailwindcss: "tailwindcss",
    javascript: "javascript",
    react: "react",
    redux: "redux",
    nodejs: "nodejs",
    express: "express",
    mongodb: "mongodb",
    sql: "sql",
    python: "python",
    django: "django",
    flask: "flask",
    java: "java",
    spring: "spring",
    kotlin: "kotlin",
    swift: "swift",
    flutter: "flutter",
    dart: "dart",
    php: "php",
    laravel: "laravel",
    mysql: "mysql",
    postgresql: "postgresql",
    aws: "aws",
    azure: "azure",
    gcp: "gcp",
    docker: "docker",
    kubernetes: "kubernetes",
    jenkins: "jenkins",
    travisci: "travisci",
    circleci: "circleci",
    gitlab: "gitlab",
    heroku: "heroku",
    netlify: "netlify",
    vercel: "vercel",
    digitalocean: "digitalocean",
    firebase: "firebase",
    graphql: "graphql",
    rest: "rest",
    socketio: "socketio",
    websockets: "websockets",
    nginx: "nginx",
    apache: "apache",
    linux: "linux",
    windows: "windows",
    macos: "macos",
    raspberry: "raspberry",
    arduino: "arduino",
    iot: "iot",
    blockchain: "blockchain",
    ethereum: "ethereum",
    bitcoin: "bitcoin",
    solidity: "solidity",
    defi: "defi",
    nft: "nft",
    cybersecurity: "cybersecurity",
    ethicalhacking: "ethicalhacking",
    bugbounty: "bugbounty",
    malware: "malware",
    forensics: "forensics",
    ctf: "ctf",
    digitalforensics: "digitalforensics",
    steganography: "steganography",
    cryptography: "cryptography",
    password: "password",
    hash: "hash",
    rsa: "rsa",
    aes: "aes",
    sha: "sha",
    jwt: "jwt",
    oauth: "oauth",
    saml: "saml",
    openid: "openid",
    sqlinjection: "sqlinjection",
    xss: "xss",
    csrf: "csrf",
    cors: "cors",
    ddos: "ddos",
    waf: "waf",
    firewall: "firewall",
    antivirus: "antivirus",
    metasploit: "metasploit",
    kali: "kali",
    parrot: "parrot",
    burp: "burp",
    wireshark: "wireshark",
    nmap: "nmap",
    hashcat: "hashcat",
    john: "john",
    cain: "cain",
    rainbowtable: "rainbowtable",
    socialengineering: "socialengineering",
    phishing: "phishing",
    ransomware: "ransomware",
    trojan: "trojan",
    worm: "worm",
    rootkit: "rootkit",
    keylogger: "keylogger",
    botnet: "botnet",
    darkweb: "darkweb",
    tor: "tor",
    vpn: "vpn",
    proxy: "proxy",
    ip: "ip",
    dns: "dns",
    tcp: "tcp",
    udp: "udp",
    http: "http",
    https: "https",
    ssl: "ssl",
    tls: "tls",
    ssh: "ssh",
    ftp: "ftp",
    sftp: "sftp",
    smtp: "smtp",
    imap: "imap",
    pop: "pop",
    voip: "voip",
    sip: "sip",
    xmpp: "xmpp",
    mqtt: "mqtt",
    iot: "iot",
    rest: "rest",
    graphql: "graphql",
    // Add more mappings here
  };

  const SkillIcon = ({ skill }) => {
    const icon = skillsIcons[skill.toLowerCase()];
    return icon ? (
      <img
        src={`https://skillicons.dev/icons?i=${icon}`}
        alt={`${skill} icon`}
        style={{ width: "40px", height: "40px", margin: "5px" }}
      />
    ) : null;
  };

  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddSkill = () => {
    if (inputValue && !skills.includes(inputValue.toLowerCase())) {
      setSkills([...skills, inputValue.toLowerCase()]);
      setInputValue("");
    }
  };

  const [view, setView] = useState("Preview");
  const [views, setViews] = useState("Markdown");
  const [formData, setFormData] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  // const handleCopyClick = () => {
  //     navigator.clipboard.writeText(markdownPreview)
  //         .then(() => setCopySuccess('Copied!'))
  //         .catch(err => setCopySuccess('Failed to copy!'));
  // };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(markdownPreview)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000); // Clear success message after 2 seconds
      })
      .catch((err) => {
        setCopySuccess("Failed to copy!");
        setTimeout(() => setCopySuccess(""), 2000); // Clear error message after 2 seconds
      });
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData(formValues);
  }, [formValues, setFormData]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  //Markdown Preview starts here
  function generateMarkdown(formValues, skills) {
    let markdown = "";

    // Visitor Badge
    if (formValues.githubUsername) {
      markdown += `![Visitor Badge](https://visitor-badge.laobi.icu/badge?page_id=${encodeURIComponent(formValues.githubUsername)})\n\n`;
    }

    // Typing SVG
    if (formValues.name) {
      markdown += '<div align="center">\n\n';
      markdown += `![Typing SVG](https://readme-typing-svg.herokuapp.com/?font=Righteous&size=35&center=true&vCenter=true&width=500&height=70&duration=4000&lines=Hi+There!+...+👋;+I'm+${encodeURIComponent(formValues.name)};)\n\n`;
    }

    // Subtitles
    if (formValues.subtitles) {
      markdown += '<div align="center">\n\n';
      markdown += ` **${formValues.subtitles}**\n\n`;
    }

    // Contact Badges
    if (
      formValues.email ||
      formValues.linkedin ||
      formValues.twitter ||
      formValues.portfolio
    ) {
      markdown += '<div align="center">\n\n';
      if (formValues.email) {
        markdown += `[![Gmail Badge](https://img.shields.io/badge/Gmail-333333?style=for-the-badge&logo=gmail&logoColor=red)](mailto:${formValues.email})\n`;
      }
      if (formValues.linkedin) {
        markdown += `[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](${formValues.linkedin})\n`;
      }
      if (formValues.twitter) {
        markdown += `[![Twitter Badge](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](${formValues.twitter})\n`;
      }
      if (formValues.portfolio) {
        markdown += `[![Portfolio Badge](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=about.me&logoColor=white)](${formValues.portfolio})\n`;
      }
      markdown += "</div>\n\n";
    }

    // About Me Section
    if (
      formValues.bio ||
      formValues.location ||
      formValues.portfolioTitle ||
      formValues.workingOnTitle ||
      formValues.learning ||
      formValues.collaborateOn ||
      formValues.additionalInfo
    ) {
      markdown += '<div align="center">\n\n';
      markdown += `<h2>About Me</h2>\n\n`;
      if (formValues.bio) {
        markdown += '<div align="center">\n\n';
        markdown += `✏️ **${formValues.bio}**\n\n`;
      }
      if (formValues.location) {
        markdown += '<div align="center">\n\n';
        markdown += `🌍 I'm based in **${formValues.location}**\n\n`;
      }
      if (formValues.portfolioTitle) {
        markdown += '<div align="center">\n\n';
        markdown += `🖥️ See my portfolio: [${formValues.portfolioTitle}](${formValues.portfolio})\n\n`;
      }
      if (formValues.workingOnTitle) {
        markdown += '<div align="center">\n\n';
        markdown += `🚀 Currently working on: **${formValues.workingOnTitle}**\n\n`;
      }
      if (formValues.learning) {
        markdown += '<div align="center">\n\n';
        markdown += `🧠 Currently learning: **${formValues.learning}**\n\n`;
      }
      if (formValues.collaborateOn) {
        markdown += '<div align="center">\n\n';
        markdown += `🤝 Open to collaborating on: **${formValues.collaborateOn}**\n\n`;
      }
      if (formValues.additionalInfo) {
        markdown += '<div align="center">\n\n';
        markdown += `⚡ **${formValues.additionalInfo}**\n\n`;
      }
    }

    //Skills Section
    if (skills.length > 0) {
      markdown += `<h2>🛠️ Languages & Tools</h2>\n\n<div align="center" style="display: flex; flex-wrap: wrap; margin-top: 10px;">\n\n`;
      skills.forEach((skill) => {
        const icon = skill.toLowerCase(); // Assuming skill is in lowercase for the API
        markdown += `<img src="https://skillicons.dev/icons?i=${icon}" alt="${skill} icon" style="width: 40px; height: 40px; margin: 5px;">\n`;
      });
      markdown += "</div>\n\n";
    }

    // GitHub Stats
    if (formValues.githubUsername) {
      markdown += `<h2>📊 GitHub Stats</h2>\n\n<div align="center">\n\n`;
      markdown += `![GitHub Streak](http://github-readme-streak-stats.herokuapp.com?user=${formValues.githubUsername}&theme=blue-green)\n\n`;
      markdown += `![GitHub Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${formValues.githubUsername}&layout=compact&theme=blue-green)\n\n`;
      markdown += `![GitHub Stats](https://bad-apple-github-readme.vercel.app/api?username=${formValues.githubUsername}&show_icons=true&count_private=true&line_height=20&icon_color=00b3ff&theme=blue-green&title_color=00b3ff)\n\n`;

      markdown += `</div>\n\n`;
    }

    if (formValues.buyMeACoffee || formValues.kofi) {
      markdown += `<h2>💖Support Me</h2>\n\n<div align="center">\n\n`;
      // markdown += '<div align="center">\n\n'; // Center the content
      if (formValues.buyMeACoffee) {
        markdown += `[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FBBC05?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](${formValues.buyMeACoffee})\n`;
      }
      if (formValues.kofi) {
        markdown += `[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=kofi&logoColor=white)](${formValues.kofi})\n`;
      }
      markdown += "</div>\n\n";
    }

    return markdown;
  }

  const markdownPreview = generateMarkdown(formValues, skills);
  console.log(markdownPreview);
  //Markdown Preview ends here

  return (
    <div
      className={`${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"} min-h-screen `}
    >
      <NavBar
        title={"GitHub Profile Generator"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <h1 className="relative z-10 font-sans text-5xl font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 mb-5">
        Github Profile Generator
      </h1>

      <div className="w-2/3 mx-auto">
        <h1 className="text-2xl font-bold mb-6">Introduction</h1>
        <label className="form-label flex items-center">
          <span className="mr-2 text-lg">👋</span> Hi! My name is:
        </label>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formValues.name}
            onChange={handleChange}
            className={`${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900 border-gray-400"} w-full
            p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />

          <div className="mt-4">
            <label className="form-label flex items-center">
              <span className="mr-2 text-lg">💡</span> Subtitle:
            </label>
            <input
              type="text"
              name="subtitles"
              placeholder="Web Developer and Designer"
              value={formValues.subtitles}
              onChange={handleChange}
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg focus:outline-none
                focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>

        <div>
          <div className="mt-4">
            <h1 className="text-2xl font-bold mt-8 mb-4">About Me</h1>
            <label className="form-label flex items-center">
              <span className="mr-2 text-lg">✏️</span> Long Description:
            </label>
            <textarea
              name="bio"
              placeholder="eg: I've been learning to code for 5 years, after switching careers. I started with HTML, but have really found a passion for backend development..."
              value={formValues.bio}
              onChange={handleChange}
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg focus:outline-none
                focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="mt-4">
            <label className="form-label flex items-center">
              <span className="mr-2 text-lg">🌍</span> I'm Living in:
            </label>
            <input
              type="text"
              name="location"
              placeholder="New York"
              value={formValues.location}
              onChange={handleChange}
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="mt-4">
            <label className="form-label flex items-center">
              <span className="mr-2 text-lg">🖥️</span> You can Connect with me:
            </label>
            <input
              type="text"
              name="portfolioTitle"
              value= {formValues.portfolioTitle}
              onChange={handleChange}
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Portfolio Title"
               
            />


            <input
                type="text"
                name="portfolio"
                placeholder="Portfolio URL"
                value={formValues.portfolio}
                onChange={handleChange}
                className={`${
                    isDarkMode
                    ? "bg-gray-800 text-gray-200"
                    : "bg-white text-gray-900 border-gray-400"
                } w-full p-2 border rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="mt-4">
            <label className="form-label flex items-center">
              <span className="mr-2 text-lg">🚀</span> I'm currently working on
            </label>
            <input
              type="text"
              name="workingOnTitle"
              value={formValues.workingOnTitle}
              onChange={handleChange}
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="MyApp"
            />
          </div>

          <div className="mt-4">
            <label className="form-label flex items-center">
              <span className="mr-2 text-lg">🧠</span> I'm currently learning
            </label>
            <input
              type="text"
              name="learning"
              value={formValues.learning}
              onChange={handleChange}
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="a new framework"
            />
          </div>

          <div className="mt-4">
            <label className="form-label flex items-center">
              <span className="mr-2 text-lg">🤝</span> I'm open to collaborating
              on
            </label>
            <input
              type="text"
              name="collaborateOn"
              value={formValues.collaborateOn}
              onChange={handleChange}
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="interesting projects"
            />
          </div>

          <div className="mt-4">
            <label className="form-label flex items-center">
              <span className="mr-2 text-lg">⚡</span> Anything else
            </label>
            <input
              type="text"
              name="additionalInfo"
              value={formValues.additionalInfo}
              onChange={handleChange}
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="I'm secretly Spiderman... but don't tell anyone"
            />
          </div>
        </div>

        <div>
          <label className="form-label flex items-center">
            <span className="mr-2 text-lg">🔗</span>
            <h1 className="text-2xl font-bold mt-8 mb-7">Links</h1>
          </label>
          <div>
            <label className="form-label flex items-center">
              <span className="mr-2 text-lg">✉️</span> Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="abc@123gmail.com"
              value={formValues.email}
              onChange={handleChange}
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg focus:outline-none
                    focus:ring-2 focus:ring-blue-500`}
            />
            {/* Gmail Badge */}
            <a
              href={`mailto:${formValues.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6"
            >
              <img
                src="https://img.shields.io/badge/Gmail-333333?style=for-the-badge&logo=gmail&logoColor=red"
                alt="Gmail Badge"
              />
            </a>
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={formValues.linkedin}
              onChange={handleChange}
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />

            <a
              href={formValues.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"
                alt="LinkedIn Badge"
                className="h-6"
              />
            </a>
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="twitter"
              placeholder="Twitter URL"
              value={formValues.twitter}
              onChange={handleChange}
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />

            <a
              href={formValues.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"
                alt="Twitter Badge"
                className="h-6"
              />
            </a>
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="portfolio"
              placeholder="Portfolio URL"
              value={formValues.portfolio}
              onChange={handleChange}
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg focus:outline-none
                    focus:ring-2 focus:ring-blue-500`}
            />
            <a
              href={formValues.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=about.me&logoColor=white"
                alt="Portfolio Badge"
                className="h-6"
              />
            </a>
          </div>

          <div>
            <label className="form-label flex items-center">
              <span className="mr-2 text-lg">🛠️</span>{" "}
              <h1 className="text-2xl font-bold mt-8 mb-7">
                Languages & Tools
              </h1>
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a skill name in lowercase e.g. react, nodejs"
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg focus:outline-none
            focus:ring-2 focus:ring-blue-500`}
            />
            <button
              onClick={handleAddSkill}
              className={`${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-blue-600 text-white"} p-3 rounded-lg mt-4 transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105`}
            >
              Add Skill
            </button>

            <div
              style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
            >
              {skills.map((skill, index) => (
                <SkillIcon key={index} skill={skill} />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold mt-8 mb-4">GitHub Stats</h1>

            <div className="mt-4">
              <label className="form-label flex items-center">
                <span className="mr-2 text-lg">🔗</span> GitHub Username
              </label>
              <input
                type="text"
                name="githubUsername"
                placeholder="GitHub Username"
                value={formValues.githubUsername}
                onChange={handleChange}
                className={`${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900 border-gray-400"} w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mt-8 mb-4">💖Support Me!</h1>
          <label className="form-label flex items-center">
            <span className="mr-2 text-lg">☕️</span> Buy me a coffee
          </label>
          <input
            type="text"
            name="buyMeACoffee"
            placeholder="Buy Me a Coffee URL"
            value={formValues.buyMeACoffee}
            onChange={handleChange}
            className={`${
              isDarkMode
                ? "bg-gray-800 text-gray-200"
                : "bg-white text-gray-900 border-gray-400"
            } w-full p-2 border rounded-lg focus:outline-none
                focus:ring-2 focus:ring-blue-500`}
          />
          <a
            href={formValues.buyMeACoffee}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/badge/Buy_Me_A_Coffee-FBBC05?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white"
              alt="Buy Me a Coffee Badge"
              className="h-6"
            />
          </a>
        </div>
        <div className="mt-4">
          <label className="form-label flex items-center">
            <span className="mr-2 text-lg">☕︎</span> Ko-fi
          </label>
          <input
            type="text"
            name="kofi"
            placeholder="Ko-fi URL"
            value={formValues.kofi}
            onChange={handleChange}
            className={`${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900 border-gray-400"}
                w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <a href={formValues.kofi} target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=kofi&logoColor=white"
              alt="Ko-fi Badge"
              className="h-6"
            />
          </a>
        </div>
      </div>

      {/* Preview section start */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center">Preview</h2>
        {view === "Preview" ? (
          <div className="markdown-preview text-center">
            {/* Visitor Badge */}
            {formValues.githubUsername && (
              <div className="mt-4">
                <img
                  src={`https://visitor-badge.laobi.icu/badge?page_id=${encodeURIComponent(formValues.githubUsername)}`}
                  alt="Visitor Badge"
                  className="mx-auto"
                />
              </div>
            )}

            {/* Typing SVG */}
            {formValues.name && (
              <div className="mt-4">
                <img
                  src={`https://readme-typing-svg.herokuapp.com/?font=Righteous&size=35&center=true&vCenter=true&width=500&height=70&duration=4000&lines=Hi+There!+...+👋;+I'm+${encodeURIComponent(formValues.name)};`}
                  alt="Typing SVG"
                  className="mx-auto"
                />
              </div>
            )}

            {/* Subtitles */}
            {formValues.subtitles && (
              <div className="mt-4">
                <p className="text-lg">
                  <span className="mr-2">💡</span> {formValues.subtitles}
                </p>
              </div>
            )}

            {/* Badges */}
            <div className="mt-4 flex justify-center flex-wrap space-x-4">
              {formValues.email && (
                <a
                  href={`mailto:${formValues.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.shields.io/badge/Gmail-333333?style=for-the-badge&logo=gmail&logoColor=red"
                    alt="Gmail Badge"
                    className="h-6"
                  />
                </a>
              )}

              {formValues.linkedin && (
                <a
                  href={formValues.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"
                    alt="LinkedIn Badge"
                    className="h-6"
                  />
                </a>
              )}

              {formValues.twitter && (
                <a
                  href={formValues.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"
                    alt="Twitter Badge"
                    className="h-6"
                  />
                </a>
              )}

              {formValues.portfolio && (
                <a
                  href={formValues.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=about.me&logoColor=white"
                    alt="Portfolio Badge"
                    className="h-6"
                  />
                </a>
              )}
            </div>

            {/* Bio, Location, Portfolio Title, and Other Information */}
            <div className="mt-4">
              {formValues.bio && (
                <div className="mt-4">
                  <h1 className="text-2xl font-bold mt-8 mb-4">About Me</h1>
                  <p className="text-lg">
                    <span className="mr-2">✏️</span> {formValues.bio}
                  </p>
                </div>
              )}

              {formValues.location && (
                <div className="mt-4">
                  <p className="text-lg">
                    <span className="mr-2">🌍</span> I'm living in{" "}
                    <strong>{formValues.location}</strong>
                  </p>
                </div>
              )}

              {formValues.portfolioTitle && (
                <div className="mt-4">
                  <p className="text-lg">
                    <span className="mr-2">🖥️</span> See my portfolio{" "}
                    <a
                      href={formValues.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline ml-1"
                    >
                      {formValues.portfolioTitle}
                    </a>
                  </p>
                </div>
              )}

              {formValues.workingOnTitle && (
                <div className="mt-4">
                  <p className="text-lg">
                    <span className="mr-2">🚀</span> I'm currently working on{" "}
                    <strong>{formValues.workingOnTitle}</strong>
                  </p>
                </div>
              )}

              {formValues.learning && (
                <div className="mt-4">
                  <p className="text-lg">
                    <span className="mr-2">🧠</span> I'm currently learning{" "}
                    <strong>{formValues.learning}</strong>
                  </p>
                </div>
              )}

              {formValues.collaborateOn && (
                <div className="mt-4">
                  <p className="text-lg">
                    <span className="mr-2">🤝</span> I'm open to collaborating
                    on <strong>{formValues.collaborateOn}</strong>
                  </p>
                </div>
              )}

              {formValues.additionalInfo && (
                <div className="mt-4">
                  <p className="text-lg">
                    <span className="mr-2">⚡</span> {formValues.additionalInfo}
                  </p>
                </div>
              )}
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mt-4">
                <h1 className="text-2xl font-bold mt-8 mb-4">
                  🛠️Languages & Tools
                </h1>
                <div className="flex flex-wrap justify-center space-x-4 mt-4">
                  {skills.map((skill, index) => (
                    <SkillIcon key={index} skill={skill} />
                  ))}
                </div>
              </div>
            )}

            {/* GitHub Stats */}
            {formValues.githubUsername && (
              <div className="mt-4">
                <h1 className="text-2xl font-bold mt-8 mb-4">GitHub Stats</h1>
                <div className="flex flex-col items-center">
                  <img
                    src={`http://github-readme-streak-stats.herokuapp.com?user=${formValues.githubUsername}&theme=blue-green`}
                    alt="GitHub Streak"
                    className="mb-4"
                  />
                  <img
                    src={`https://bad-apple-github-readme.vercel.app/api?username=${formValues.githubUsername}&show_icons=true&count_private=true&line_height=20&icon_color=00b3ff&theme=blue-green&title_color=00b3ff`}
                    alt="GitHub Stats"
                    className="mb-4"
                  />
                  <img
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${formValues.githubUsername}&layout=compact&theme=blue-green`}
                    alt="GitHub Langs"
                  />
                </div>
              </div>
            )}

            {/* Support Me */}
            {(formValues.buyMeACoffee || formValues.kofi) && (
              <div className="mt-4">
                <h1 className="text-2xl font-bold mt-8 mb-4">💖Support Me!</h1>
                <div className="flex justify-center space-x-4">
                  {formValues.buyMeACoffee && (
                    <a
                      href={formValues.buyMeACoffee}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="https://img.shields.io/badge/Buy_Me_A_Coffee-FBBC05?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white"
                        alt="Buy Me a Coffee Badge"
                        className="h-6"
                      />
                    </a>
                  )}

                  {formValues.kofi && (
                    <a
                      href={formValues.kofi}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=kofi&logoColor=white"
                        alt="Ko-fi Badge"
                        className="h-6"
                      />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Markdown Preview:</h3>

            <div className="markdown-preview" />
            <div
              className="markdown-preview"
              dangerouslySetInnerHTML={{ __html: markdownPreview }}
            />

            {/* {markdownPreview} */}

            <div className="mt-2">
              <button
                onClick={handleCopyClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Copy Markdown
              </button>
              {copySuccess && (
                <p className="mt-2 text-green-500">{copySuccess}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Preview section end */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setView(view === "Preview" ? "Markdown" : "Preview")}
          className={`${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-blue-600 text-white"} p-3 rounded-lg`}
        >
          {view === "Preview"
            ? "Switch to Markdown View"
            : "Switch to Preview View"}
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default InputForm;
