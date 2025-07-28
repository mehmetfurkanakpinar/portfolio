// Animated "About Me" text button with orbiting/flying stars
function AnimatedStarsButton({ onClick }) {
  // Number of stars
  const starCount = 12;
  // Use state to store angle and orbit radius for each star
  const [stars, setStars] = React.useState(
    Array.from({ length: starCount }, (_, i) => ({
      angle: Math.random() * 360,
      orbit: 14 + Math.random() * 11,
      speed: 0.7 + Math.random() * 1.5,
      color: Math.random() < 0.5 ? "#ffe066" : "#fff"
    }))
  );
  // Animate the stars
  React.useEffect(() => {
    const id = setInterval(() => {
      setStars((prev) =>
        prev.map((star) => ({
          ...star,
          angle: (star.angle + star.speed) % 360,
        }))
      );
    }, 50);
    return () => clearInterval(id);
  }, []);

  // Butonun tam ortasını referans alıyoruz
  return (
    <div className="relative inline-block align-middle" style={{ height: '100%' }}>
      {/* Star animation */}
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: 68, height: 28,
          zIndex: 2,
          pointerEvents: "none"
        }}
      >
        {stars.map((star, i) => {
          const rad = (star.angle * Math.PI) / 180;
          const rx = star.orbit + 15;
          const ry = star.orbit * 0.65;
          const x = 34 + Math.cos(rad) * rx;
          const y = 14 + Math.sin(rad) * ry;
          const size = 2.5 + Math.abs(Math.sin(rad + i)) * 1.8;
          const baseOpacity = 0.83 + Math.sin(star.angle / 13 + i) * 0.13;
          const shadow = star.color === "#ffe066"
            ? "0 0 12px 3px #ffe066cc"
            : "0 0 14px 3px #ffffffe8";
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: size,
                height: size,
                borderRadius: "50%",
                background: star.color,
                opacity: baseOpacity,
                filter: "blur(0.2px)",
                boxShadow: shadow,
                pointerEvents: "none"
              }}
            />
          );
        })}
      </div>
      {/* Plain text About Me button */}
      <button
        onClick={onClick}
        className="relative z-10 font-medium text-base md:text-sm text-white hover:text-blue-400 transition focus:outline-none"
        style={{
          background: "none",
          boxShadow: "none",
          padding: "0 0.5rem",
          minWidth: 74,
          height: 28,
          lineHeight: "28px",
          fontFamily: "inherit",
          fontWeight: 500,
          color: "inherit",
        }}
      >
        About Me
      </button>
    </div>
  );
}
import React, { useState, useMemo, useEffect } from "react";

// Yıldız efekti: Ekranın tamamına rastgele küçük yıldızlar (nokta) dağıtır
function Starfield({ count = 60 }) {
  // Yıldızları sadece ilk renderda bir kere üret ve sabit tut
  const stars = useMemo(() => (
    Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 1.6 + 0.5,
      opacity: Math.random() * 0.4 + 0.3,
    }))
  ), [count]);
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            background: "white",
            opacity: star.opacity,
            boxShadow: `0 0 8px 1px rgba(255,255,255,${star.opacity * 0.7})`,
          }}
        />
      ))}
    </div>
  );
}

// Profile image (replace with your image in public folder)
const PROFILE_IMG = process.env.PUBLIC_URL + "/profile.jpg";

const skills = [
  { name: "SQL", color: "from-blue-500 to-cyan-400" },
  { name: "Python", color: "from-yellow-400 to-orange-500" },
  { name: "ML", color: "from-green-400 to-teal-500" },
  { name: "Tableau", color: "from-indigo-400 to-purple-500" },
  { name: "Excel", color: "from-green-300 to-lime-400" },
  { name: "SPSS", color: "from-pink-400 to-fuchsia-500" },
];

const projects = [
  // 0. Analysing Online Shopper Behaviour: A Hybrid Clustering Approach
  {
    title: "🛍️ Analysing Online Shopper Behaviour: A Hybrid Clustering Approach",
    short: "Segmentation of e-commerce users using hybrid clustering to uncover behavioural patterns and marketing insights.",
    details: (
      <div>
        <section className="mb-5">
          <h4 className="font-semibold text-base mb-2">🧠 Project Summary</h4>
          <p>
            This project focuses on segmenting e-commerce users based on behavioural patterns — such as viewing, adding to cart, and purchasing — using K-Means clustering and manual segmentation. The aim is to uncover insights around user loyalty, conversion, and purchase timing.
          </p>
        </section>
        <section className="mb-5">
          <h4 className="font-semibold text-base mb-2">🔗 GitHub & Report</h4>
          <div className="mb-3">
            <a
              href="https://github.com/mehmetfurkanakpinar/ecommerce-customer-segmentation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-gray-700 transition"
            >
              View Project on GitHub
            </a>
          </div>
          <div>
            <a
              href="https://github.com/mehmetfurkanakpinar/ecommerce-customer-segmentation/blob/main/Customer_Segmentation_Project.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-green-700 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
            >
              View PDF Report
            </a>
          </div>
        </section>
        <section className="mb-5">
          <h4 className="font-semibold text-base mb-2">💡 Techniques & Tools</h4>
          <ul className="list-disc ml-6">
            <li>Data Cleaning & Feature Engineering (Python, pandas)</li>
            <li>Exploratory Data Analysis (matplotlib, seaborn)</li>
            <li>K-Means Clustering (scikit-learn)</li>
            <li>Manual Rule-Based Segmentation</li>
            <li>Customer Journey Analysis</li>
            <li>Purchase Timing Distribution</li>
          </ul>
        </section>
      </div>
    ),
  },
  // 1. "Detecting Suicide Ideation on Social Media"
  {
    title: "🧠 Detecting Suicide Ideation on Social Media",
    short: "AI-driven detection of suicidal ideation using DistilBERT.",
    details: (
      <div className="space-y-4">
        <section>
          <h4 className="font-semibold text-base mb-1">🌸 Project Motivation</h4>
          <p>
            The idea behind this project stemmed from a deeply personal moment. A close friend of mine, who is a psychologist, once shared a tragic story about a 13-year-old child who had taken their own life. Hearing this affected me profoundly. It made me realise that suicide is not just something that affects adults—children, too, can suffer in silence, as global suicide statistics sadly confirm.
          </p>
          <img src="/suicide_statistics.png" alt="Global Suicide Statistics" className="w-full rounded-lg my-3 shadow" />
          <p>
            With a background in psychology, I’ve always been interested in the intersection of mental health and technology. This project gave me the opportunity to combine my technical skills with something that genuinely matters to me—using artificial intelligence as a supportive tool in the fight against suicide.
          </p>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">🎯 Objectives</h4>
          <ul className="list-disc pl-5">
            <li>To develop a high-performing and interpretable AI model for early detection of suicidal ideation using social media data.</li>
            <li>To adapt DistilBERT to domain-specific mental health language through fine-tuning.</li>
            <li>To demonstrate how transformer-based models can be applied in real-world mental health monitoring.</li>
          </ul>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">🧹 Dataset and Preprocessing</h4>
          <ul className="list-disc pl-5">
            <li>
              <b>Text Cleaning:</b> Special characters, HTML tags, emojis, and excessive punctuation were removed using regular expressions. Stop words were retained due to their contextual importance in mental health language.
            </li>
            <li>
              <b>Tokenisation:</b> The DistilBERT tokenizer was used to convert text into subword tokens, aiding in handling slang, misspellings, and informal language.
            </li>
            <li>
              <b>Padding & Truncation:</b> Each sequence was standardised to 256 tokens to ensure uniform input dimensions for the model.
            </li>
            <li>
              <b>Dataset Splitting:</b> Data was split into training (60%), validation (20%), and test (20%) sets with stratification to maintain class balance.
            </li>
          </ul>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">☁️ Word Cloud Analysis</h4>
          <p>
            Word cloud visualisations highlighted the distinct language used across classes. Suicide-labelled posts prominently featured terms such as “life”, “want”, “feel”, “friend”, and “help”, indicating emotional intensity and social concerns. In contrast, non-suicide posts were more casual, with common terms like “people”, “school”, and “day”, reflecting general conversation topics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <img src="/suicide_wordcloud.png" alt="Word Cloud for Suicide Texts" className="rounded-lg shadow" />
            <img src="/non-suicide_wordcloud.png" alt="Word Cloud for Non-Suicide Texts" className="rounded-lg shadow" />
          </div>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">🤖 Model Development & Performance</h4>
          <p>
            A pre-trained DistilBERT model was fine-tuned for binary classification by adding a dense classification head. Training was conducted using the AdamW optimiser (learning rate: 2e-5, weight decay: 5e-4), with a batch size of 8 over 5 epochs. Early stopping was applied to avoid overfitting.
          </p>
          <ul className="list-disc pl-5 mb-2">
            <li><b>Accuracy:</b> 97.96%</li>
            <li><b>Precision:</b> 98.02%</li>
            <li><b>Recall:</b> 97.89%</li>
            <li><b>F1 Score:</b> 97.96%</li>
          </ul>
          <img src="/confusion_matrix.png" alt="Confusion Matrix" className="w-full rounded-lg shadow" />
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">📝 Discussion & Ethical Considerations</h4>
          <p>
            Despite the high accuracy, the model’s reliance on a single data source (Reddit) and English-only language limits its generalisability. Future improvements should include multilingual and multimodal datasets, and integration of explainable AI techniques to enhance model transparency.
          </p>
          <p>
            Handling sensitive mental health data required careful attention to privacy, bias, and the implications of misclassification. The model is intended to support—not replace—clinical judgment in suicide prevention.
          </p>
        </section>
      </div>
    ),
  },
  // 2. "NHS A&E 4-Hour Target Analysis (2010–2025)"
  {
    title: "📊 NHS A&E 4-Hour Target Analysis (2010–2025)",
    short: "Time series forecasting and visualisation of NHS emergency wait targets.",
    details: (
      <div className="space-y-4">
        <section>
          <h4 className="font-semibold text-base mb-1">🌸 Project Motivation</h4>
          <p>
            Although I have never personally needed to use the NHS’s emergency services, I have often heard complaints from people around me about the long waiting times. Out of curiosity, I wanted to explore more about the service provided, especially focusing on waiting times. Therefore, this project analyses NHS A&E (Accident and Emergency) 4-hour target achievement rates from 2010 to 2025, combining data analysis, forecasting, and visualisation.
          </p>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">🔍 Project Overview</h4>
          <ul className="list-disc pl-5">
            <li>Data cleaning and feature engineering using Python.</li>
            <li>Time series decomposition to understand trend and seasonality.</li>
            <li>Forecasting using Facebook Prophet.</li>
            <li>Visualisation with Tableau dashboard.</li>
          </ul>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">🗃️ Dataset</h4>
          <ul className="list-disc pl-5">
            <li>
              <b>Source:</b> NHS England A&E Attendances and Emergency Admissions dataset.
            </li>
            <li>
              <b>Link:</b>{" "}
              <a href="https://www.england.nhs.uk/statistics/statistical-work-areas/ae-waiting-times-and-activity/" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">
                Visit Dataset
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">📉 Time Series Decomposition</h4>
          <img src="/Seasonal_Decomposition.png" alt="Time Series Decomposition" className="w-full rounded-lg shadow bg-white p-2" style={{ background: "white", padding: "8px" }} />
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">🔮 Forecasting Future Trends</h4>
          <img src="/prophet_2018-26_12M.png" alt="Forecasting Future Trends" className="w-full rounded-lg shadow bg-white p-2" style={{ background: "white", padding: "8px" }} />
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">📊 Tableau Dashboard</h4>
          <a
            href="https://public.tableau.com/views/NHS_Visualisation/Dashboard1?:language=en-GB&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            View Tableau Dashboard
          </a>
        </section>
        {/* GitHub Button */}
        <section>
          <a
            href="https://github.com/mehmetfurkanakpinar/NHS_4-hour-target_Analysis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition project-button"
          >
            View on GitHub
          </a>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">💡 Key Insights</h4>
          <ul className="list-disc pl-5">
            <li>Clear seasonal patterns were detected, with performance dips during winter months.</li>
            <li>Covid-19 caused visible anomalies around 2020.</li>
            <li>Forecasts suggest a mild improvement trend but with increasing uncertainty.</li>
          </ul>
        </section>
      </div>
    ),
  },
  // 3. "Exploratory Data Analysis on Layoffs Dataset with SQL and Tableau"
  {
    title: "📉 Exploratory Data Analysis on Layoffs Dataset with SQL and Tableau",
    short: "Exploratory analysis of global layoff data using SQL & Tableau.",
    details: (
      <div>
        <section className="mb-5">
          <h4 className="font-semibold text-base mb-2">🔍 Project Overview</h4>
          <p>
            This project presents an <b>exploratory data analysis (EDA)</b> of global tech layoffs, combining <b>SQL</b> for data cleaning and transformation with <b>Tableau</b> for interactive visual analytics. The aim was to uncover patterns and trends in layoff events across companies, locations, and time.
          </p>
        </section>
        <section className="mb-5">
          <h4 className="font-semibold text-base mb-2">🗃️ Dataset & Data Preparation</h4>
          <ul className="list-disc pl-5 mb-2">
            <li>
              <b>Source:</b> <a href="https://www.kaggle.com/datasets/swaptr/layoffs-2022" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">Kaggle Layoffs Dataset</a> (2022–2023)
            </li>
            <li>
              <b>Cleaning:</b> Used SQL to handle missing values, standardize company/country names, and filter out incomplete records.
            </li>
            <li>
              <b>Transformation:</b> Created derived columns (such as year, month, percentage laid off) for richer temporal and proportional analysis.
            </li>
          </ul>
        </section>
        <section className="mb-5">
          <h4 className="font-semibold text-base mb-2">📊 Key Insights</h4>
          <ul className="list-disc pl-5 mb-2">
            <li>
              <b>Layoffs by Year:</b> 2022 saw a dramatic spike in layoffs compared to previous years, with 2023 continuing the trend at a slower pace.
            </li>
            <li>
              <b>Industries Most Affected:</b> Fintech, Consumer, and Retail sectors experienced the highest number of layoffs.
            </li>
            <li>
              <b>Top Companies:</b> Major tech firms like <b>Meta, Amazon, Google, and Microsoft</b> led in total layoffs.
            </li>
            <li>
              <b>Geographical Trends:</b> The United States accounted for the largest share of layoffs, with notable events in India, the UK, and Canada.
            </li>
            <li>
              <b>Layoff Magnitude:</b> Some companies laid off over 50% of their workforce in a single event.
            </li>
          </ul>
        </section>
        <section className="mb-5">
        <h4 className="font-semibold text-base mb-2">📈 Interactive Tableau Dashboard</h4>
        <div className="mb-3">
            <a
            href="https://public.tableau.com/views/Layoffs_Dashboard_17437959337790/Dashboard1?:language=en-GB&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
            View Interactive Tableau Dashboard
            </a>
        </div>
        </section>
        <section className="mb-5">
          <h4 className="font-semibold text-base mb-2">🛠️ Skills & Tools</h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-800 px-3 py-1 rounded-full text-xs">SQL</span>
            <span className="bg-purple-700 px-3 py-1 rounded-full text-xs">Tableau</span>
            <span className="bg-yellow-700 px-3 py-1 rounded-full text-xs">Data Visualization</span>
            <span className="bg-green-600 px-3 py-1 rounded-full text-xs">Data Cleaning</span>
          </div>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-2">🔗 Links</h4>
          <ul className="list-disc pl-5">
            <li>
              <a href="https://public.tableau.com/views/LayoffDashboard_17095881848960/LayoffsDashboard?:language=en-US&:display_count=n&:origin=viz_share_link" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">Interactive Tableau Dashboard</a>
            </li>
            <li>
              <a href="https://www.kaggle.com/datasets/swaptr/layoffs-2022" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">Kaggle Dataset Source</a>
            </li>
          </ul>
        </section>
      </div>
    ),
  },
  // 4. "Designing and Developing a Database System for a Software Company"
  {
    title: "🗃️ Designing and Developing a Database System for a Software Company",
    short: "From database tech selection to advanced SQL queries and schema design.",
    details: (
      <div className="space-y-4">
        <section>
          <h4 className="font-semibold text-base mb-1">🌸 Project Motivation</h4>
          <p>
            This was the first project I ever did in database design—and honestly, it was so much fun that I instantly knew I’d found something I wanted to stick with. It genuinely got me excited to dive deeper into the field. I even managed to become the second-best student in my Database Design and Development module, missing first place by just two points! Still, it was a fantastic introduction and really boosted my motivation to keep improving.
          </p>
        </section>
        <section>
          <h4 className="font-semibold text-lg mt-4 mb-2">📑 Designing and Developing a Database System for a Software Company</h4>
          <h5 className="font-semibold mb-1">🗄️ Database Technology Selection</h5>
          <p>
            I critically evaluated several database technologies, including Relational Databases, Cloud Databases, NoSQL, Object-Oriented Databases, and NewSQL. After assessing each type’s strengths and limitations, relational database technology emerged as the ideal choice due to its structured approach, powerful querying capabilities, and reliability, especially for complex relational data.
          </p>
        </section>
        <section>
          <h5 className="font-semibold mb-1">🔎 Database Design</h5>
          <p>
            The design phase began with creating an Entity Relationship Diagram (ERD) and detailed Relational Schema Mapping, defining relationships, keys, and structures clearly. This phase included assumptions for improved system clarity, like linking each employee to specific products and explicitly assigning maintenance teams to software versions.
          </p>
          <div>
            <div className="font-medium mb-1">📌 Entity Relationship Diagram (ERD)</div>
            <img src="/ERD.png" alt="Entity Relationship Diagram" className="w-full rounded-lg shadow mb-4 bg-white p-2" style={{ background: "white", padding: "8px" }} />
          </div>
          <div>
            <div className="font-medium mb-1">📌 Relational Schema Mapping</div>
            <img src="/relational_schema.png" alt="Relational Schema Mapping" className="w-full rounded-lg shadow bg-white p-2" style={{ background: "white", padding: "8px" }} />          </div>
        </section>
        <section>
          <h5 className="font-semibold mb-1 mt-4">🛠️ Database Development & Implementation</h5>
          <p>
            The physical design phase involved translating the relational schema into a practical database system, with clearly defined tables, relationships, and populated data to ensure system practicality.
          </p>
        </section>
        <section>
          <h5 className="font-semibold mb-1 mt-4">📝 SQL Query Demonstrations</h5>
          <p>
            I developed targeted SQL queries demonstrating database functionality, such as identifying products with specific versions, listing users who reported issues, and highlighting unresolved problems. Here are two examples from the project:
          </p>
          <div className="mb-2">
            <div className="font-medium">◆ Internal users with issues still in progress (reported in 2023)</div>
            <pre className="bg-gray-800 rounded-lg p-3 text-xs overflow-x-auto mt-1">
{`select internal_users.int_user_name, f.status
from internal_users,
  (select users.user_name, problem_report.status
    from users, quality_assurance, problem_report
    where users.user_name = quality_assurance.user_name
      and quality_assurance.report_number = problem_report.report_number
      and quality_assurance.report_date like '%2023%'
      and problem_report.status like '%Progress%'
    group by users.user_name) as f
where internal_users.int_user_name = f.user_name;`}
            </pre>
          </div>
          <div>
            <div className="font-medium">◆ Low priority reports from 2022 not assigned to maintenance teams</div>
            <pre className="bg-gray-800 rounded-lg p-3 text-xs overflow-x-auto mt-1">
{`select qa.report_number, qa.report_status
from quality_assurance qa
where qa.priority_rate like '%Low%' and qa.report_date like '%2022%'
group by qa.report_number, qa.report_status
having qa.report_status != 'With Maintenance';`}
            </pre>
          </div>
        </section>
        <section>
          <h5 className="font-semibold mb-1 mt-4">🔒 Security and Access Control</h5>
          <p>
            A robust security model was implemented to manage data access and operational permissions, defining tailored privileges for different user roles as well.
          </p>
        </section>
      </div>
    ),
  },
  // 5. "Turkish Palate – A Taste of Turkey Online"
  {
    title: "🍽️ Turkish Palate – A Taste of Turkey Online",
    short: "A responsive web application introducing Turkish cuisine with e-commerce features.",
    details: (
      <div className="space-y-4">
        <section>
          <h4 className="font-semibold text-base mb-1">🌸 Project Motivation</h4>
          <p>
            This project was part of my Web Development module during my master’s programme. The brief was simple: build an engaging, responsive website about a topic that you’re interested in. And I chose Turkish cuisine—a rich, vibrant part of my culture. It wasn’t just about meeting course requirements; it was genuinely enjoyable to bring something personal and authentic into a technical project. Although this assignment was quite challenging for me—being the first time I’d ever built a fully functional website—I genuinely learned a great deal from the experience.
          </p>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">🍽️ About the Project</h4>
          <p>
            "Turkish Palate" is a responsive, interactive website designed to introduce users to the delicious diversity of Turkish cuisine. Featuring clear navigation, appealing visuals, and detailed information about traditional Turkish dishes, the site was developed to offer an immersive online culinary experience.
          </p>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">🥇 Features at a Glance</h4>
          <ul className="list-disc pl-5">
            <li><b>Responsive Design:</b> Ensures smooth navigation on desktops, tablets, and smartphones.</li>
            <li><b>Interactive Menu:</b> Detailed descriptions and vibrant imagery of Turkish dishes.</li>
            <li><b>Shopping Cart Functionality:</b> Allows users to add products to a cart and simulate online purchases.</li>
            <li><b>User Authentication:</b> Sign-in and sign-up functionality for personalised user experiences.</li>
            <li><b>User-friendly Interface:</b> Simple, intuitive navigation for an enjoyable browsing experience.</li>
            <li><b>Dynamic Content:</b> Interactive blog and product sections that enhance user engagement.</li>
          </ul>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">🛠️ Technologies Used</h4>
          <ul className="list-disc pl-5">
            <li>HTML5 &amp; CSS3</li>
            <li>JavaScript</li>
            <li>Responsive Web Design</li>
            <li>UX/UI Design Principles</li>
          </ul>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">🖼️ Project Screenshots</h4>
          <div className="flex flex-col gap-4">
            <img src="/homepage.png" alt="Homepage Screenshot" className="rounded-lg shadow" />
            <img src="/menu.png" alt="Menu Screenshot" className="rounded-lg shadow" />
            <img src="/blog.png" alt="Blog Screenshot" className="rounded-lg shadow" />
            <img src="/about.png" alt="About Us Screenshot" className="rounded-lg shadow" />
            <img src="/contact.png" alt="Contact Screenshot" className="rounded-lg shadow" />
          </div>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">🔗 Project Links</h4>
          <ul className="list-disc pl-5">
            <li>
              <a href="https://turkish-palate-1u6y.onrender.com/" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">Live Demo</a>
            </li>
            <li>
              Source Code (available upon request)
            </li>
          </ul>
        </section>
        <section>
          <h4 className="font-semibold text-base mb-1">💬 Reflection & Learning Outcomes</h4>
          <p>
            Working on “Turkish Palate” allowed me to significantly enhance my web development skills, particularly regarding responsive design and UX/UI principles. Although I realised web development might not be my favourite area, blending digital tools with cultural expression was still a rewarding experience. This project gave me valuable insights and helped me clarify the direction I want to take in my future career.
          </p>
        </section>
      </div>
    ),
  },
];

// Hamburger icon SVG
const Hamburger = ({ open }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect y="5" width="24" height="2" rx="1" fill={open ? "#60A5FA" : "#FFF"} />
    <rect y="11" width="24" height="2" rx="1" fill={open ? "#F472B6" : "#FFF"} />
    <rect y="17" width="24" height="2" rx="1" fill={open ? "#FBBF24" : "#FFF"} />
  </svg>
);

function OrbitingSkill({ skill, idx, total, orbitRadius = 120, animate = true, tick = 0 }) {
  // Her skill için eşit aralıklı açı hesapla
  const baseAngle = (360 / total) * idx;
  // Animasyonlu dönüş için açıyı güncelle
  const animatedAngle = animate ? baseAngle + tick * 1 : baseAngle;
  const rad = (animatedAngle * Math.PI) / 180;
  const x = Math.cos(rad) * orbitRadius;
  const y = Math.sin(rad) * orbitRadius;

  return (
    <div
      className="absolute left-1/2 top-1/2 transition-all"
      style={{
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
      }}
    >
      <div
        className={`px-3 py-1 md:px-4 md:py-2 rounded-full bg-gradient-to-br ${skill.color} text-xs md:text-base text-white font-semibold shadow-lg backdrop-blur-md`}
      >
        {skill.name}
      </div>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutMeOpen, setAboutMeOpen] = useState(false);

  // For animated orbits, force re-render every 50ms
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 50);
    return () => clearInterval(id);
  }, []);

  // Responsive orbit size
  const isMobile = window.innerWidth < 768;
  const orbitSize = isMobile ? 80 : 160;

  // Ensure only one modal is open at a time
  useEffect(() => {
    if (aboutMeOpen && selected !== null) setSelected(null);
    // (optional: if selected opens, close aboutMeOpen)
    if (selected !== null && aboutMeOpen) setAboutMeOpen(false);
  }, [aboutMeOpen, selected]);

  // About Me modal content
  const aboutMeModalBody = (
    <div className="space-y-6 text-[18px] md:text-[20px]">
      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#9443f6] text-center">Hey there, I'm Furkan! 🎉</h2>
      <section>
        <h3 className="font-bold text-lg mb-1 text-[#9443f6]">👩‍💻 A Little About Me</h3>
        <h4 className="font-bold text-base mb-1 text-[#fbc02d]">🌟 Why This Page?</h4>
        <p>
          👋 I created this page to connect with you on a more personal level. <b>While showcasing my technical projects is important</b>, I also believe that <b>who I am as a person matters just as much.</b> After all, <b>technical skills and enthusiasm alone don’t always make someone a great team member.</b> I do my best work when I’m surrounded by people I enjoy working with — and I imagine you might feel the same! 🤝
        </p>
        <h4 className="font-bold text-base mb-1 text-[#9443f6] mt-4">💼 Life After Graduation</h4>
        <p>
          🧳 Since graduating, I’ve been working at a Wetherspoon pub to support myself financially without relying on my family. While I appreciate what this job has taught me — responsibility, pace, and resilience — <b>it doesn’t quite feed my soul.</b> That’s why I spend most of my spare time <b>sharpening my SQL and Python skills</b> and building projects to grow as a data analyst. 📝💻
        </p>
        <h4 className="font-bold text-base mb-1 text-[#9443f6] mt-4">🧠 From Psychology to Data</h4>
        <p>
          🧠 If you’ve looked at my CV, you might’ve wondered what a psychology graduate is doing with a master’s in computer science 🤔 Well, I’ve always been <b>deeply curious about people.</b> Even as a child, I was drawn to <b>understanding complex emotions and behaviours.</b> Psychology was a natural fit, and I have no regrets about that path. But when I graduated, I realised that <b>one-on-one therapy wasn’t the best fit for me.</b> I wanted to do something more collective, more impact-driven. 🌏
        </p>
        <h4 className="font-bold text-base mb-1 text-[#9443f6] mt-4">🧠 Psychology & Data: Not So Different</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li>💡 Psychology and data analysis share a surprising amount in common.</li>
          <li>🧑‍⚕️ A therapist gathers data through conversation, interprets it using theory, and helps guide people. A data analyst? We gather, interpret, and provide insights to help people or organisations make better decisions. ✨</li>
        </ul>
        <h4 className="font-bold text-base mb-1 text-[#7a1c88] mt-4">🌱 Where I See Myself</h4>
        <p>
          In the long term, I aspire to be at the forefront of data-driven innovation — solving meaningful problems, shaping strategy, and contributing to impactful projects through analytics and technology. I aim to continuously expand my skill set while working on challenging problems that create real value.
        </p>
        <h4 className="font-bold text-base mb-1 text-[#9443f6] mt-4">🌟 Interests</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li>🎬 I’m a huge horror movie fan. I especially enjoy discussing the storylines — I genuinely believe horror is one of the hardest genres to do well, and I admire those who pull it off.</li>
          <li>😅 Ironically, I’m also a big sitcom lover — I think <b>Modern Family</b> might be my all-time favourite.</li>
          <li>🌅 Watching sunsets gives me an abnormal level of peace. (Fun fact: I sometimes travel to different cities around the UK just to catch one.)</li>
          <li>🏄‍♂️ I’ve only tried paragliding so far, but I’m pretty sure extreme sports are my #1 undiscovered hobby!</li>
          <li>🎤 I have a soft spot for live concerts.</li>
          <li>🖤 I recently got into charcoal drawing — surprisingly calming and really fun.</li>
          <li>🍻 One of my favourite things is catching up with close friends over a pint at the pub. I love the pub culture in the UK.</li>
        </ul>
      </section>
      <div className="text-center mt-6 text-base text-gray-400">
        <span className="italic">← Back to Portfolio</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white font-sans relative text-[17px] md:text-[19px] leading-relaxed md:leading-loose">
      <Starfield count={70} />
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-4 md:px-8 py-4 md:py-5 z-20 bg-gradient-to-b from-black/70 to-transparent backdrop-blur-sm">
        <div className="font-bold text-base md:text-lg tracking-wider">Mehmet Furkan AKPINAR</div>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 font-medium text-sm">
          <AnimatedStarsButton onClick={() => { setAboutMeOpen(true); setSelected(null); }} />
          <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </div>
        {/* Mobile Hamburger */}
        <button className="md:hidden z-30" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <Hamburger open={menuOpen} />
        </button>
        {/* Mobile Nav */}
        <div className={`fixed top-0 right-0 w-5/6 max-w-xs h-screen bg-gray-900/95 shadow-2xl flex flex-col items-center justify-center gap-8 text-lg font-semibold transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 md:hidden`}>
          <button
            onClick={() => { setAboutMeOpen(true); setMenuOpen(false); setSelected(null); }}
            className="text-white font-medium text-xl"
          >
            About Me
          </button>
          <a href="#projects" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#contact" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        {/* Overlay for mobile nav */}
        {menuOpen && <div className="fixed inset-0 z-10 bg-black/50" onClick={() => setMenuOpen(false)}></div>}
      </nav>

      {/* HEADER "GALAXY" */}
      <header className="relative flex flex-col items-center justify-center pt-20 md:pt-32 pb-20 md:pb-28 min-h-[60vh] md:min-h-[70vh]">
        {/* Orbits */}
        <div className="relative w-[320px] h-[310px] md:w-[440px] md:h-[410px] mb-2 md:mb-3">
          {skills.map((skill, i) => (
            <OrbitingSkill
              key={i}
              skill={skill}
              idx={i}
              total={skills.length}
              orbitRadius={orbitSize}
              animate={true}
              tick={tick}
            />
          ))}
          {/* Profil Fotoğrafı */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-full p-1 md:p-2 bg-gradient-to-tr from-blue-500 via-purple-600 to-orange-400 animate-pulse shadow-2xl">
              <img
                src={PROFILE_IMG}
                alt="Mehmet Furkan Akpinar"
                className="rounded-full w-20 h-20 md:w-36 md:h-36 object-cover border-2 md:border-4 border-black shadow-lg"
              />
            </div>
          </div>
        </div>
        <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight text-center mb-1 md:mb-2">
          Mehmet Furkan <span className="text-blue-400">AKPINAR</span>
        </h1>
        <div className="text-base md:text-2xl font-medium text-center bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent mb-4 md:mb-5">
          Aspiring Data Analyst with a Background in Psychology
        </div>
        <a
          href="mailto:akpinarmehmetfurkan@gmail.com?subject=Request%20for%20CV"
          className="mt-2 md:mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 font-semibold shadow-md hover:scale-105 transition text-base md:text-lg"
        >
          Request CV
        </a>
      </header>

      {/* ABOUT ME */}
      <section id="about" className="max-w-2xl mx-auto py-7 md:py-12 px-3 md:px-5">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Profile</h2>
        <p className="mb-3 md:mb-4 text-base md:text-lg leading-relaxed text-justify">
          I am passionate about leveraging data to drive insights and support better decision-making.
          With a background in <b>Psychology</b> and advanced training in <b>Computer Science</b>, I bring a unique interdisciplinary approach to data analysis—combining a deep understanding of human behavior with strong technical skills in SQL, Python, and machine learning.
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="bg-blue-800 px-3 py-1 rounded-full text-xs">SQL</span>
          <span className="bg-yellow-700 px-3 py-1 rounded-full text-xs">Python</span>
          <span className="bg-green-800 px-3 py-1 rounded-full text-xs">Machine Learning</span>
          <span className="bg-purple-700 px-3 py-1 rounded-full text-xs">Tableau</span>
          <span className="bg-green-600 px-3 py-1 rounded-full text-xs">Excel</span>
          <span className="bg-pink-800 px-3 py-1 rounded-full text-xs">SPSS</span>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-3xl mx-auto py-8 md:py-12 px-3 md:px-5">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/90 border border-gray-700 rounded-2xl shadow-lg p-4 md:p-5 group transition cursor-pointer hover:scale-105"
              onClick={() => {
                if (p.details !== null) { setSelected(i); setAboutMeOpen(false);}
              }}
            >
              <div className="text-lg md:text-xl font-bold group-hover:text-blue-400 transition">{p.title}</div>
              <div className="mt-2 text-sm md:text-base opacity-80">{p.short}</div>
            </div>
          ))}
        </div>
        {/* Modal for project details */}
        {selected !== null && projects[selected] && projects[selected].details !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-2" onClick={() => setSelected(null)}>
            <div
              className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-4 md:p-8 relative text-[19px] md:text-[21px] leading-loose md:leading-relaxed"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute top-2 right-3 text-gray-500 hover:text-red-400 text-2xl font-bold">&times;</button>
              <h3 className="text-lg md:text-2xl font-bold mb-3 text-blue-300">{projects[selected].title}</h3>
              <div className="mb-2">{projects[selected].details}</div>
            </div>
          </div>
        )}
      </section>

      {/* ABOUT ME MODAL */}
      {aboutMeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-2" onClick={() => setAboutMeOpen(false)}>
          <div
            className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-4 md:p-8 relative text-[19px] md:text-[21px] leading-loose md:leading-relaxed"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setAboutMeOpen(false)} className="absolute top-2 right-3 text-gray-500 hover:text-red-400 text-2xl font-bold">&times;</button>
            {aboutMeModalBody}
          </div>
        </div>
      )}

      {/* CONTACT */}
      <section id="contact" className="max-w-2xl mx-auto py-7 md:py-12 px-3 md:px-5">
        <h2 className="text-xl md:text-2xl font-bold mb-3">Contact</h2>
        <div className="flex flex-col gap-3 md:gap-2 text-base md:text-lg">
          <a href="mailto:akpinarmehmetfurkan@gmail.com" className="flex items-center gap-2 hover:text-blue-400 transition">
            <span>📧</span> akpinarmehmetfurkan@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/mehmetfurkanakpinar/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition">
            <span>🔗</span> LinkedIn
          </a>
        </div>
      </section>

      <footer className="text-center py-4 md:py-5 text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Mehmet Furkan Akpinar. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
