<h1>MERN Blog Project</h1>
<p>A full-stack blog application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack.</p>

<h2>Features</h2>
<ul>
  <li>User authentication (Login/Signup)</li>
  <li>Create, read, update, and delete blog posts</li>
  <li>Categorize posts with tags</li>
  <li>Rich text editor for creating posts</li>
  <li>Profile management</li>
  <li>Responsive design for seamless experience on all devices</li>
  <li>Pagination for blog posts</li>
  <li>View individual blog post pages</li>
  <li>Category-wise filtering of blog posts</li>
  <li>Tags-wise filtering of blog posts</li>
</ul>

<h2>Tech Stack</h2>
<h3>Frontend:</h3>
<ul>
  <li>React.js</li>
  <li>Tailwind CSS</li>
  <li>React Router</li>
  <li>React Icons</li>
  <li>React Hot Toast</li>
</ul>

<h3>Backend:</h3>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB</li>
  <li>JWT (JSON Web Tokens) for authentication</li>
</ul>

<h2>Getting Started</h2>
<h3>Prerequisites</h3>
<ul>
  <li>Node.js and npm installed</li>
  <li>MongoDB installed and running</li>
</ul>

<h3>Installation</h3>
<ol>
  <li>Clone the repository:
    <pre><code>git clone https://github.com/your-username/mern-blog.git
cd mern-blog
    </code></pre>
  </li>
  <li>Install server dependencies:
    <pre><code>cd server
npm install
    </code></pre>
  </li>
  <li>Install client dependencies:
    <pre><code>cd ../client
npm install
    </code></pre>
  </li>
</ol>

<h3>Environment Variables</h3>
<p>Create a <code>.env</code> file in the <code>server</code> directory and add the following variables:</p>
<pre><code>PORT=3001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
</code></pre>

<h3>Running the Application</h3>
<ol>
  <li>Start the backend server:
    <pre><code>cd server
npm start
    </code></pre>
  </li>
  <li>Start the frontend development server:
    <pre><code>cd ../client
npm start
    </code></pre>
  </li>
  <li>Open your browser and navigate to <code>http://localhost:3000</code></li>
</ol>

<h2>Feature Descriptions</h2>
<h3>Responsive Design</h3>
<p>The application is designed to be responsive, ensuring a seamless experience on devices of all sizes, including desktops, tablets, and mobile phones.</p>

<h3>Pagination</h3>
<p>Pagination is implemented to handle the display of a large number of blog posts. Users can easily navigate through different pages to find older or newer posts.</p>

<h3>Individual Blog Pages</h3>
<p>Each blog post has its own dedicated page, displaying the full content along with its tags, category, and other relevant information.</p>

<h3>Category-wise Filtering</h3>
<p>Users can filter blog posts by category, making it easier to find posts related to a specific topic.</p>

<h3>Tags-wise Filtering</h3>
<p>Similar to category-wise filtering, users can also filter posts by tags. This allows users to quickly find posts that are tagged with specific keywords.</p>
