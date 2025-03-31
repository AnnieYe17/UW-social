// Optimized Navbar Component
class Navbar extends HTMLElement {
  constructor() {
    super();

this.innerHTML = `
  <nav>
    <ul class="navbar">
      <div class="nav-items">
        <li>
          <img src="images/logo1.png" alt="UW Social Logo" class="logo">
        </li>
        <li><a href="index.html">🏠 HOME</a></li>
        <li><a href="events.html">🎪 Events</a></li>
        <li><a href="publish.html">🚀 Publish New</a></li>

        <div id="auth-buttons" style="display: none;">
        <a href="#" onclick="googleLogin(); return false;" class="login-link">🔑 Login</a>
        </div>

        <div id="user-profile" style="display: none;">
          <a href="profile.html">👨‍🎓 Profile</a>
        <div id="user-info">
          Welcome, <span id="user-name"></span>!
          <a href="#" onclick="logout(); return false;" class="logout-link" id="logout-button">Logout</a>
        </div>
        </div>
      </div>
    </ul>
  </nav>
  `;
}
}

// Auth functions
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  
  provider.setCustomParameters({ prompt: 'select_account' });
  
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log('Login successful:', user);
      document.getElementById('user-name').textContent = user.displayName;
      
      // 构造用户数据：仅保留 id 和 name
      const userData = {
        id: user.uid,
        name: user.displayName
      };
      
      // 发送 POST 请求到后端接口，存储用户数据
      fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('User data stored in backend:', data);
      })
      .catch(error => {
        console.error('Error storing user data:', error);
      });
    })
    .catch((error) => {
      console.error('Login failed:', error);
      alert('Login failed: ' + error.message);
    });
}


function logout() {
  firebase.auth().signOut()
    .then(() => {
      console.log('Logout successful');
      // 不手动调用状态更新，依赖onAuthStateChanged自动触发
    })
    .catch((error) => {
      console.error('Logout failed:', error);
    });
}

window.onload = function() {
  document.getElementById('auth-buttons').style.display = 'none';
  document.getElementById('user-profile').style.display = 'none';
  document.getElementById('user-info').style.display = 'none';
};


firebase.auth().onAuthStateChanged((user) => {
  console.log("Auth state changed:", user ? "Logged in" : "Logged out");
  
  const authButtons = document.getElementById('auth-buttons');
  const userProfile = document.getElementById('user-profile');
  const userInfo = document.getElementById('user-info');
  const userNameElement = document.getElementById('user-name');
  const logoutButton = document.getElementById('logout-button');

  if (user) {
    // 登录状态
    authButtons.style.display = 'none';
    userProfile.style.display = 'block';
    userInfo.style.display = 'block';
    if (userNameElement) {
      userNameElement.textContent = user.displayName || "User";
    }
    console.log("User logged in:", user.displayName);
  } else {
    // 未登录状态
    authButtons.style.display = 'block';
    userProfile.style.display = 'none';
    userInfo.style.display = 'none';
    console.log("No user logged in");
  }
});

// 注册导航栏组件
if (!customElements.get('nav-bar')) {
  customElements.define('nav-bar', Navbar);
}