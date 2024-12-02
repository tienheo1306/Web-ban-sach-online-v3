// Lấy từ cuối trong LoggedInUserName
function getLastWord(fullName) {
  console.log(fullName);
  if (!fullName) {
    console.error("Tên không hợp lệ.");
    return "";
  }
  const nameParts = fullName.trim().split(" ");
  const lastWord = nameParts[nameParts.length - 1];
  return lastWord;
}
//check email
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
// ============================================
// xuân mai test đăng ký đăng nhập again :)
// Tải danh sách user mặc định chỉ khi localStorage chưa có dữ liệu
function loadDefaultUsers() {
  if (!localStorage.getItem("users")) {
    const defaultUsers = [
      {
        id: 1,
        name: "Trần Kim Yến",
        email: "kimyen2712204@gmail.com",
        password: "1234",
        phone: "0124569876",
        status: "Hoạt động",
      },
      {
        id: 2,
        name: "Trần Kim Yến",
        email: "yen2712@gmail.com",
        password: "1234",
        phone: "0124564476",
        status: "Hoạt động",
      },
    ];

    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }
}

// Khi tải trang
document.addEventListener("DOMContentLoaded", () => {
  loadDefaultUsers(); // Chỉ gọi nếu localStorage chưa có dữ liệu
  const userLocal = JSON.parse(localStorage.getItem("users")) || [];
  localStorage.setItem("users", JSON.stringify(userLocal));
});

const formdk = document.getElementById("formdk");
const name = document.getElementById("nameSignup");
const email = document.getElementById("emailSignup");
const password = document.getElementById("passwordSignup");
const password2 = document.getElementById("password2Signup");
const diachi = document.getElementById("diachiSignup");

const nameError = document.getElementById("nameErrorSignup");
const emailError = document.getElementById("emailErrorSignup");
const passwordError = document.getElementById("passwordErrorSignup");
const password2Error = document.getElementById("password2ErrorSignup");
const diachiError = document.getElementById("diachiErrorSignup");

//lấy dữ liệu từ lcstorage
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

formdk.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!name.value) {
    nameError.style.display = "block";
    name.focus();
  } else {
    nameError.style.display = "none";
  }

  if (!email.value) {
    emailError.style.display = "block";
    email.focus();
  } else {
    emailError.style.display = "none";
    if (!validateEmail(email.value)) {
      emailError.style.display = "block";
      emailError.innerHTML = "Email sai định dạng!!!!!";
      email.focus();
    }
  }

  if (!password.value) {
    passwordError.style.display = "block";
    password.focus();
  } else {
    passwordError.style.display = "none";
  }

  if (!password2.value) {
    password2Error.style.display = "block";
    password2.focus();
  } else {
    password2Error.style.display = "none";
  }

  if (password.value !== password2.value) {
    password2Error.style.display = "block";
    password2Error.innerHTML = "Mật khẩu không khớp!!!!!";
    password2.focus();
  } else {
    password2Error.style.display = "none";
  }

  if (!diachi.value) {
    diachiError.style.display = "block";
    diachi.focus();
  } else {
    diachiError.style.display = "none";
  }

  //gửi dữ liệu lên lcstorage
  if (
    name.value &&
    email.value &&
    password.value &&
    password2.value &&
    password.value === password2.value &&
    diachi.value &&
    validateEmail(email.value)
  ) {
    //lấy data từ form gộp thành 1 đối tượng

    const user = {
      userID: Math.ceil(Math.random() * 10000000),
      userName: name.value,
      email: email.value,
      password: password.value,
      address: diachi.value,
    };
    //push user vào mảng userlocal
    userLocal.push(user);
    //lưu dữ liệu lên lcstorage
    localStorage.setItem("users", JSON.stringify(userLocal));

    //chuyển hướng về đăng nhập
    setTimeout(() => {
      showSigninForm();
    }, 1000);
  }
});

// tab navigation dkdn
const signupForm = document.querySelector(".container.signup");
const signinForm = document.querySelector(".container.signin");
const toSigninLinks = document.querySelectorAll(
  '.container.signup a[href="javascript:;"]'
);
const toSignupLinks = document.querySelectorAll(
  '.container.signin a[href="javascript:;"]'
);

// //chuyển sang form dk
function showSignupForm() {
  const wrapper = document.getElementById("wrapper");
  if (wrapper && signinForm && signupForm) {
    // Ẩn tất cả các phần tử con trực tiếp của wrapper
    Array.from(wrapper.children).forEach((child) => {
      if (child.tagName !== "MAIN" && child.tagName !== "HEADER") {
        child.classList.add("hidden");
      }
    });
    // Hiển thị form đăng ký
    const mainElements = document.querySelectorAll("main");
    mainElements.forEach((mainElement) => {
      mainElement.classList.remove("hidden");
    });
    signupForm.style.display = "block";
    // Ẩn form đăng nhập
    signinForm.style.display = "none";
  }
}

//chuyển sang form dn
function showSigninForm() {
  const wrapper = document.getElementById("wrapper");
  if (wrapper && signinForm && signupForm) {
    // Ẩn tất cả các phần tử con trực tiếp của wrapper
    Array.from(wrapper.children).forEach((child) => {
      if (child.tagName !== "MAIN" && child.tagName !== "HEADER") {
        child.classList.add("hidden");
      }
    });
    // Hiển thị form đăng nhập
    const mainElements = document.querySelectorAll("main");
    mainElements.forEach((mainElement) => {
      mainElement.classList.remove("hidden");
    });
    signupForm.style.display = "none";
    // Ẩn form đăng ký
    signinForm.style.display = "block";
  }
}

// xl sk click
toSigninLinks.forEach((link) => {
  link.addEventListener("click", showSigninForm);
});

toSignupLinks.forEach((link) => {
  link.addEventListener("click", showSignupForm);
});

//dn mặc định
// showSigninForm();

const formdn = document.getElementById("formdn");
const emailInput = document.getElementById("emailSignin");
const passwordInput = document.getElementById("passwordSignin");
const baoloi = document.getElementById("baoloiSignin");

formdn.addEventListener("submit", function (e) {
  e.preventDefault();

  // Lấy dữ liệu từ localStorage
  const userLocal = JSON.parse(localStorage.getItem("users")) || [];
  const email = emailInput.value;
  const password = passwordInput.value;

  if (userLocal.length === 0) {
    baoloi.style.color = "red";
    baoloi.innerHTML = "Không có người dùng trong hệ thống!";
    return;
  }

  // Tìm thông tin người dùng khớp với email và password
  const findUser = userLocal.find(
    (user) => user.email === email && user.password === password
  );

  if (findUser) {
    // Đăng nhập thành công
    baoloi.style.color = "green";
    baoloi.innerHTML = "Đăng nhập thành công!";
    setTimeout(() => {
      // chuyển hướng trang chủ
      // Hiển thị header và phần tử homepage
      loginSuccess(findUser);
      updateHeader();
      const header = document.querySelector("header");
      const main = document.querySelector("main");
      const homepage = document.querySelector(".homepage");
      const footer = document.querySelector("footer");
      header.classList.remove("hidden"); // Hiển thị header
      homepage.classList.remove("hidden"); // Hiển thị homepage
      main.classList.add("hidden"); // Ẩn login signup
      footer.classList.remove("hidden"); // Hiển thị footer
    }, 1000);
  } else {
    // Hiển thị thông báo lỗi nếu không khớp mk hoặc email
    baoloi.style.color = "red";
    baoloi.innerHTML = "Email hoặc mật khẩu không đúng!";
  }
});

let cart = [];
// login thành công
function loginSuccess(user) {
  localStorage.setItem("cart", JSON.stringify([]));
  localStorage.setItem("loggedInUser", JSON.stringify(user));
  // Hiển thị tên người dùng trong span
  const userNameSpan = document.getElementById("loggedInName");
  if (userNameSpan) {
    userNameSpan.textContent = getLastWord(user.name);
    console.log(userNameSpan); // Thay đổi tên người dùng trong span
  }
}

// Đăng xuất
function logout() {
  // Xóa thông tin người dùng khỏi localStorage
  localStorage.removeItem("loggedInUser");
  cart = [];
  localStorage.setItem("cart", JSON.stringify([]));
  const userNameSpan = document.getElementById("loggedInName");
  userNameSpan.textContent = ""; // Thay đổi tên người dùng trong span
  const loginBtn = document.getElementById("login-btn");
  const signupBtn = document.getElementById("signup-btn");
  const logoutBtn = document.getElementById("logout-btn");
  // Hiển thị nút đăng nhập và đăng ký
  loginBtn.style.display = "inline";
  signupBtn.style.display = "inline";
  // ẩn nút đăng xuất
  logoutBtn.style.display = "none";
  // Xóa dữ liệu trong các thẻ input
  const inputElements = document.querySelectorAll("input");
  inputElements.forEach((input) => {
    input.value = "";
  });
  const children = wrapper.children;
  Array.from(children).forEach((child) => {
    child.classList.remove("hidden");
    if (
      child.tagName !== "HEADER" &&
      child.tagName !== "FOOTER" &&
      !child.classList.contains("homepage")
    ) {
      child.classList.add("hidden");
    }
  });
  const div = document.getElementById("baoloiSignin");
  div.innerHTML = "";
}

function updateHeader() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const spanName = getLastWord(loggedInUser.name);
  const loggedInName = document.getElementById("loggedInName");
  const loginBtn = document.getElementById("login-btn");
  const signupBtn = document.getElementById("signup-btn");
  const logoutBtn = document.getElementById("logout-btn");

  if (loggedInUser) {
    // Nếu người dùng đã đăng nhập, hiển thị tên và nút đăng xuất
    loggedInName.textContent = spanName;
    loggedInName.style.display = "inline";

    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    logoutBtn.style.display = "inline";
  } else {
    // Nếu chưa đăng nhập, hiển thị nút đăng nhập và đăng ký
    loggedInName.textContent = "";
    loggedInName.style.display = "none";

    loginBtn.style.display = "inline";
    signupBtn.style.display = "inline";
    logoutBtn.style.display = "none";
  }
}

// xuân mai test đăng ký đăng nhập again :)

/* Start: Yen*/

/* Start: modal show address*/
let addresses = [
  {
    idAddress: 1,
    userName: "Vân Anh",
    userAddress:
      "04 Đ. Tôn Đức Thắng, Phường Bến Nghé , Quận 1, Thành phố Hồ Chí Minh",
    phoneNumber: "0102030405",
  },
  {
    idAddress: 2,
    userName: "Vân Anh",
    userAddress:
      "105 Đ. Bà Huyện Thanh Quan, Phường Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh",
    phoneNumber: "0102030405",
  },
  {
    idAddress: 3,
    userName: "Vân Anh",
    userAddress:
      "273 Đ. An Dương Vương, Phường 3, Quận 5, Thành phố Hồ Chí Minh",
    phoneNumber: "0102030405",
  },
];
const changeAddress = document.getElementById("change-address");
const confirmAddress = document.getElementById("confirm-address");
const overlayShippingAddress = document.getElementById(
  "shipping-address-overlay"
);
changeAddress.addEventListener("click", function () {
  overlayShippingAddress.style.display = "flex";
});

confirmAddress.addEventListener("click", function () {
  overlayShippingAddress.style.display = "none";
});

/// Hàm tạo một phần tử địa chỉ
function createAddressItem(address) {
  const li = document.createElement("li");
  li.classList.add("address-item");
  li.innerHTML = `
      <input type="radio" name="address-option" value="${address.userAddress}">
      <div class="address-item-choice">
        <div class="address-item-info">
        <p><span class="username">${address.userName}</span> (${address.phoneNumber})</p>
        <p>${address.userAddress}</p>
        </div>
        <div class="address-item-btns">
          <button class="edit-address-btn" id ="edit-address-btn">Sửa</button>
          <button class="delete-address-btn" id ="delete-address-btn">Xóa</button>
        </div>
      </div>
  `;
  return li;
}

// Hàm hiển thị danh sách địa chỉ
function displayAddresses() {
  const addressList = document.getElementById("address-list");
  const ul = addressList.querySelector("ul");
  ul.innerHTML = ""; // Xóa danh sách cũ trước khi hiển thị mới
  addresses.forEach((address) => {
    const li = createAddressItem(address);
    ul.appendChild(li);
  });
}

// Gọi hàm hiển thị khi trang load xong
displayAddresses();
/* End: modal show address*/

/* Start: modal add address*/
const addAddress = document.getElementById("add-address");
const confirmAddAddress = document.getElementById("confirm-add-address");
const cancelAddAddress = document.getElementById("cancel-add-address");
const overlayAddAddress = document.getElementById("add-address-overlay");
addAddress.addEventListener("click", function () {
  overlayAddAddress.style.display = "flex";
  overlayShippingAddress.style.display = "none";
});

confirmAddAddress.addEventListener("click", function () {
  overlayAddAddress.style.display = "none";
  overlayShippingAddress.style.display = "flex";
});

cancelAddAddress.addEventListener("click", function () {
  overlayAddAddress.style.display = "none";
  overlayShippingAddress.style.display = "flex";
});
/* End: modal add address*/
/* Start: modal edit address*/
const editAddress = document.querySelector(".edit-address-btn");
const saveEditAddress = document.getElementById("save-edit-address");
const cancelEditAddress = document.getElementById("cancel-edit-address");
const overlayEditAddress = document.getElementById("edit-address-overlay");

editAddress.addEventListener("click", function () {
  overlayEditAddress.style.display = "flex";
  overlayShippingAddress.style.display = "none";
});

saveEditAddress.addEventListener("click", function () {
  overlayEditAddress.style.display = "none";
  overlayShippingAddress.style.display = "flex";
});

cancelEditAddress.addEventListener("click", function () {
  overlayEditAddress.style.display = "none";
  overlayShippingAddress.style.display = "flex";
});
/* End: modal edit address*/

// Bắt đầu truy cập => trang chủ
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.getElementById("wrapper");
  const logout = document.getElementById("logout-btn");
  logout.classList.add("hidden");
  if (wrapper) {
    // Lấy tất cả các phần tử con trực tiếp của wrapper
    const children = wrapper.children;

    // Duyệt qua từng phần tử con và kiểm tra
    Array.from(children).forEach((child) => {
      // Kiểm tra nếu không phải là main
      if (
        child.tagName !== "HEADER" &&
        child.tagName !== "FOOTER" &&
        !child.classList.contains("homepage")
      ) {
        child.classList.add("hidden");
      }
    });
  }
});

// xem giỏ hàng
// chưa dăng nhập và đã đăng nhập
document.querySelector(".cart-btn").addEventListener("click", () => {
  // Kiểm tra trạng thái đăng nhập
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
    showSigninForm();
    return;
  }

  const cartContainer = document.getElementById("cart-container");
  cartContainer.classList.remove("hidden");
  const children = wrapper.children;
  Array.from(children).forEach((child) => {
    child.classList.remove("hidden");
    if (
      child.tagName !== "HEADER" &&
      child.tagName !== "FOOTER" &&
      !child.classList.contains("container-cart")
    ) {
      child.classList.add("hidden");
    }
  });
});

function returnHomepage() {
  // Lấy tất cả các phần tử con trực tiếp của wrapper
  const children = wrapper.children;
  Array.from(children).forEach((child) => {
    child.classList.remove("hidden");
    if (
      child.tagName !== "HEADER" &&
      child.tagName !== "FOOTER" &&
      !child.classList.contains("homepage")
    ) {
      child.classList.add("hidden");
    }
  });
}

// Hàm để hiển thị 4 sản phẩm best seller từ localStorage
function displayBestSellerProducts() {
  const productGrid = document.querySelector(".product-grid-bestseller");

  // Lấy dữ liệu sản phẩm từ localStorage
  const products = JSON.parse(localStorage.getItem("products"));
  // Kiểm tra nếu có sản phẩm và lọc các sản phẩm có isBestSeller = true
  if (products && Array.isArray(products)) {
    const bestSellerProducts = products.filter(
      (product) => product.isBestSeller === true
    );

    // Lấy 4 sản phẩm đầu tiên
    const limitedProducts = bestSellerProducts.slice(0, 4);

    // Kiểm tra nếu có sản phẩm best seller
    if (limitedProducts.length > 0) {
      // Hiển thị các sản phẩm best seller
      limitedProducts.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");

        // Tạo cấu trúc HTML cho mỗi sản phẩm
        productElement.innerHTML = `
          <img src="${product.img}" alt="${product.name}" />
          <p>${product.name}</p>
          <span class="price">${product.price} đ</span>
        `;
        // Thêm sự kiện click vào thẻ sản phẩm
        productElement.addEventListener("click", function () {
          showProductDetails(product.id); // Hiển thị chi tiết sản phẩm khi bấm vào
        });
        // Thêm phần tử sản phẩm vào grid
        productGrid.appendChild(productElement);
      });
    }
  } else {
    console.log("Không tìm thấy sản phẩm trong localStorage");
  }
}

// Hàm để hiển thị 4 sản phẩm có thể loại "Manga" hoặc "Comic"
function displayMangaComicProducts() {
  const productGrid = document.querySelector(".product-grid-manga");
  const products = JSON.parse(localStorage.getItem("products"));

  // Kiểm tra nếu có sản phẩm và lọc các sản phẩm có thể loại là "Manga" hoặc "Comic"
  if (products && Array.isArray(products)) {
    const filteredProducts = products.filter(
      (product) => product.category === "Manga, Comic"
    );
    const limitedProducts = filteredProducts.slice(0, 4);

    // Kiểm tra nếu có sản phẩm trong danh sách đã lọc
    if (limitedProducts.length > 0) {
      // Hiển thị các sản phẩm đã lọc
      limitedProducts.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");

        // Tạo cấu trúc HTML cho mỗi sản phẩm
        productElement.innerHTML = `
          <img src="${product.img}" alt="${product.name}" />
          <p>${product.name}</p>
          <span class="price">${product.price} đ</span>
        `;
        // Thêm sự kiện click vào thẻ sản phẩm
        productElement.addEventListener("click", function () {
          showProductDetails(product.id); // Hiển thị chi tiết sản phẩm khi bấm vào
        });
        // Thêm phần tử sản phẩm vào grid
        productGrid.appendChild(productElement);
      });
    } else {
      productGrid.innerHTML = "<p>Không có sản phẩm Manga hoặc Comic</p>";
    }
  } else {
    console.log("Không tìm thấy sản phẩm trong localStorage");
  }
}

window.onload = function () {
  displayBestSellerProducts();
  displayMangaComicProducts();
  updateHeader();
};

//Hiển thị chi tiết sản phẩm
function showProductDetails(productId) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const selectedProduct = products.find(
    (product) => product.id === Number(productId)
  );
  if (selectedProduct) {
    // Lưu thông tin sản phẩm vào localStorage
    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
    console.log(selectedProduct); //kiểm tra
    displayProductDetails(selectedProduct);
  } else {
    console.log("Sản phẩm không tồn tại.");
  }
}

function displayProductDetails(product) {
  // Lấy tất cả các phần tử con trực tiếp của wrapper
  const children = wrapper.children;
  Array.from(children).forEach((child) => {
    child.classList.remove("hidden");
    if (
      child.tagName !== "HEADER" &&
      child.tagName !== "FOOTER" &&
      !child.classList.contains("container-item-detail")
    ) {
      child.classList.add("hidden");
    }
  });

  document.getElementById("product-title").innerText = product.name;
  document.getElementById("product-author").innerText = product.author;
  document.getElementById("product-publisher").innerText = product.publisher;
  document.getElementById("product-image").src = product.img;
  document.getElementById("detail-author").innerText = product.author;
  document.getElementById("quantity").innerText = 1;
  document.getElementById("detail-publisher").innerText = product.publisher;
  document.getElementById("detail-year").innerText = product.publishedYear;
  document.getElementById("product-description").innerText = product.desc;
  document.getElementById("theLoaiSP").innerText = product.category;
  const quantityElement = document.getElementById("quantity");
  let quantity = parseInt(quantityElement.innerText);
  document.getElementById("increase-btn").addEventListener("click", () => {
    quantity += 1;
    quantityElement.innerText = quantity;
  });
  document.getElementById("decrease-btn").addEventListener("click", () => {
    if (quantity > 1) {
      quantity -= 1;
      quantityElement.innerText = quantity;
    }
  });
  document.getElementById("theLoaiSP").onclick = function () {
    filterProducts(product.category);
  };
  document.querySelector(".add-to-cart").onclick = function () {
    addToCart(product, quantity);
  };
}

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Clear cart from localStorage
function clearCartFromLocalStorage() {
  console.log("Clearing cart from localStorage");
  localStorage.removeItem("cart");
  cart = [];
  updateCartUI();
  console.log("Cart cleared successfully");
}

function addToCart(product, quantity) {
  // Kiểm tra trạng thái đăng nhập
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
    showSigninForm();
    return;
  }

  if (!product || !product.id) {
    throw new Error("Sản phẩm không hợp lệ.");
  }
  if (quantity <= 0) {
    throw new Error("Số lượng phải lớn hơn 0.");
  }
  const cartItem = cart.find((item) => item.product.id === product.id);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  saveCartToLocalStorage();
  updateCartUI();
  alert("Thêm sản phảm thành công.");
}

// Update cart UI
function updateCartUI() {
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalQuantityElement = document.querySelector(".total-quantity");
  const totalPriceElement = document.querySelector(".total-price");

  if (!isCartNotEmpty()) {
    // alert("Giỏ hàng đang trống!");
    // returnHomepage();
    return;
  }
  cartItemsContainer.innerHTML = `
    <h1>Giỏ hàng</h1>
    <div class="empty-cart-message ${
      cart.length > 0 ? "hidden" : ""
    }">Giỏ hàng trống</div>
    <div class="chi-tiet">
      <p>Tên sản phẩm</p>
      <p>Số lượng</p>
      <p>Thành tiền</p>
    </div>`;

  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    const itemTotalPrice = item.product.price * item.quantity;
    totalQuantity += item.quantity;
    totalPrice += itemTotalPrice;

    const cartItemHTML = `
      <div class="cart-item" data-id="${item.product.id}">
        <div>          
          <div class="cart-item-image">
            <img class="cart-img-product" src="${item.product.img}"/>
          </div>
          <div class="info-product-cart">
            <p>${item.product.name}</p>
            <div class="price-original">
              <span class="price">${item.product.price} đ</span>
            </div>
          </div>
        </div>
        <div class="cart-item-quantity">
          <input type="text" class="amount" name="amount" id ="amountInCart" value="${item.quantity}" readonly/>
        </div>
        <div>
          <div class="cart-item-price">
            <p class="item-price">${itemTotalPrice} đ</p>
          </div>
          <div class="delete" onclick="removeFromCart('${item.product.id}')">
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>`;

    cartItemsContainer.innerHTML += cartItemHTML;
  });

  totalQuantityElement.innerText = totalQuantity;
  totalPriceElement.innerText = `${totalPrice} đ`;
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.product.id !== Number(productId));
  saveCartToLocalStorage();
  updateCartUI();
}

// Show cart from localStorage
function showCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    console.log("Cart contents:", JSON.parse(storedCart));
  } else {
    console.log("No cart found in localStorage.");
  }
}

function isCartNotEmpty() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart.length);
  return cart.length > 0;
}

// Gắn sự kiện click cho nút "Thanh toán"
function paymentMethod() {
  // Kiểm tra trạng thái  giỏ hàng
  if (!isCartNotEmpty()) {
    alert("Giỏ hàng đang trống!");
    returnHomepage();
    // return;
  } else updatePaymentInfo();
}

// Hàm cập nhật thông tin thanh toán
function updatePaymentInfo() {
  const children = wrapper.children;
  Array.from(children).forEach((child) => {
    child.classList.remove("hidden");
    if (
      child.tagName !== "HEADER" &&
      child.tagName !== "FOOTER" &&
      !child.classList.contains("container__cart-payment")
    ) {
      child.classList.add("hidden");
    }
  });

  // Lấy thông tin giỏ hàng từ localStorage hoặc biến toàn cục `cart`
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const paymentContainer = document.querySelector(".container__cart-payment");
  const orderDetailsContainer =
    paymentContainer.querySelector(".order-details");
  const shippingFee = 30000; // Ví dụ: phí ship cố định
  let totalCost = 0;

  // Xóa nội dung cũ (nếu có)
  orderDetailsContainer.innerHTML = `
    <h1>Kiểm Tra Lại Đơn Hàng</h1>
  `;

  // Duyệt qua giỏ hàng và hiển thị sản phẩm
  cart.forEach((item) => {
    const itemTotalPrice = item.product.price * item.quantity;
    totalCost += itemTotalPrice;
    // console.log(totalCost);
    const productHTML = `
      <div class="cart-product">
        <div class="product-img-name">
          <img class="cart-img-product" src="${item.product.img}" />
          <h4>${item.product.name}</h4>
        </div>
        <p>x${item.quantity}</p>
        <p>${itemTotalPrice.toLocaleString()} đ</p>
      </div>
    `;
    orderDetailsContainer.innerHTML += productHTML;
  });

  // Hiển thị tổng tiền và phí ship
  const totalAmountContainer = paymentContainer.querySelector(
    ".total-amount span:last-child"
  );
  const shippingFeeContainer = paymentContainer.querySelector(
    ".shipping-fee span:last-child"
  );
  const totalCostContainer = paymentContainer.querySelector(
    ".total-cost span:last-child"
  );

  totalAmountContainer.textContent = `${totalCost.toLocaleString()} đ`;
  shippingFeeContainer.textContent = `${shippingFee.toLocaleString()} đ`;
  totalCostContainer.textContent = `${(
    totalCost + shippingFee
  ).toLocaleString()} đ`;
}

// Hàm xử lý thanh toán
function handleCheckout() {
  // Lấy thông tin từ localStorage
  let usercart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!isCartNotEmpty()) {
    alert("Giỏ hàng trống! Không thể thanh toán.");
    return;
  }

  // Lấy phương thức thanh toán đã chọn
  const selectedPaymentMethod = getSelectedPaymentMethod();
  if (!selectedPaymentMethod) {
    alert("Vui lòng chọn phương thức thanh toán!");
    return;
  }

  // Lưu thông tin đơn hàng vào localStorage
  const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
  const idOrder = String(orderHistory.length + 1).padStart(2, "0"); // Tự động tạo ID
  const newOrder = {
    id: idOrder, // Mã đơn hàng duy nhất
    usercart,
    total: calculateTotal(usercart),
    paymentMethod: selectedPaymentMethod, // Lưu phương thức thanh toán
    date: new Date().toLocaleString(),
  };
  orderHistory.push(newOrder);
  localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

  // Xóa giỏ hàng
  cart = [];
  localStorage.setItem("cart", JSON.stringify([]));

  // Hiển thị popup thành công
  showOrderSuccessPopup();
}

// Hàm lấy phương thức thanh toán đã chọn
function getSelectedPaymentMethod() {
  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  for (const radio of paymentRadios) {
    if (radio.checked) {
      return radio.value; // Trả về "cod" hoặc "credit"
    }
  }
  return null; // Nếu không có radio nào được chọn
}

// Hàm tính tổng tiền
function calculateTotal(cart) {
  const shippingFee = 30000; // Ví dụ phí ship cố định
  let total = 0;
  cart.forEach((item) => {
    total += item.product.price * item.quantity;
  });
  return total + shippingFee;
}

// Hàm hiển thị popup thông báo thành công
function showOrderSuccessPopup() {
  const children = wrapper.children;
  Array.from(children).forEach((child) => {
    child.classList.remove("hidden");
    if (
      child.tagName !== "HEADER" &&
      child.tagName !== "FOOTER" &&
      !child.classList.contains("container__cart-payment") &&
      !child.classList.contains("order-successfully-popup")
    ) {
      child.classList.add("hidden");
    }
  });
  const popup = document.querySelector(".overlay");
  popup.style.display = "flex";

  // Gắn sự kiện cho các nút trong popup
  document
    .getElementById("return-homepage-btn")
    .addEventListener("click", returnHomepage);
  document
    .getElementById("view-order-btn")
    .addEventListener("click", viewOrders);
}

// Hàm xem đơn hàng
function viewOrders() {
  alert("Xem đơn hàng (chuyển hướng tới trang lịch sử đơn hàng).");
  // Tùy bạn muốn chuyển hướng hoặc hiển thị trang khác:
  // window.location.href = "/orders.html";
}

//hiển thị sản phẩm khi tìm kiếm
// Hàm lọc và hiển thị sản phẩm theo phân loại
function filterProducts(category) {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  let filteredProducts = products.filter(
    (product) => product.category === category
  );
  const children = wrapper.children;
  Array.from(children).forEach((child) => {
    child.classList.remove("hidden");
    if (
      child.tagName !== "HEADER" &&
      child.tagName !== "FOOTER" &&
      !child.classList.contains("search-container")
    ) {
      child.classList.add("hidden");
    }
  });
  document.getElementById(
    "search-result-category"
  ).innerText = `${category} (${filteredProducts.length} kết quả)`;
  renderProducts(filteredProducts);
}

function filterBestSellerProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  let filteredProducts = products.filter(
    (product) => product.isBestSeller === true
  );
  const children = wrapper.children;
  Array.from(children).forEach((child) => {
    child.classList.remove("hidden");
    if (
      child.tagName !== "HEADER" &&
      child.tagName !== "FOOTER" &&
      !child.classList.contains("search-container")
    ) {
      child.classList.add("hidden");
    }
  });
  document.getElementById(
    "search-result-category"
  ).innerText = `BestSeller (${filteredProducts.length} kết quả)`;
  renderProducts(filteredProducts);
}

// Hàm hiển thị sản phẩm
function renderProducts(filteredProducts = []) {
  const productGrid = document.querySelector(".product-grid-search");
  const products = filteredProducts.length
    ? filteredProducts
    : JSON.parse(localStorage.getItem("products")) || [];

  const rowsPerPage = 9;
  const pageCount = Math.ceil(products.length / rowsPerPage);

  let currentPage = 1;

  // Hiển thị bảng sản phẩm cho trang hiện tại
  function displayGrid(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = products.slice(start, end);

    productGrid.innerHTML = paginatedData
      .map(
        (product) => `
       <div class="product-item" onclick="showProductDetails('${product.id}')">
         <img src="${product.img}" alt="${product.name}" />
         <p>${product.name}</p>
         <span class="price">${product.price}</span>
       </div>
      `
      )
      .join("");
  }

  // Hiển thị phân trang
  function displayPagination(page) {
    const pagination = document.getElementById("paginationProduct");
    pagination.innerHTML = "";

    const prevButton = document.createElement("a");
    prevButton.innerHTML = "&laquo;";
    prevButton.classList.add("pagination-btn");
    prevButton.href = "#";
    prevButton.disabled = page === 1;
    prevButton.addEventListener("click", () => {
      if (page > 1) {
        currentPage--;
        displayGrid(currentPage);
        displayPagination(currentPage);
      }
    });
    pagination.appendChild(prevButton);

    const pageButtons = [];
    const startPage = Math.max(1, page - 2); // Xác định trang bắt đầu
    const endPage = Math.min(pageCount, page + 2); // Xác định trang kết thúc

    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement("a");
      button.innerText = i;
      button.classList.add("pagination-btn");
      button.href = "#";
      if (i === currentPage) button.classList.add("active");
      button.addEventListener("click", () => {
        currentPage = i;
        displayGrid(currentPage);
        displayPagination(currentPage);
      });
      pagination.appendChild(button);
    }

    const nextButton = document.createElement("a");
    nextButton.innerHTML = "&raquo;";
    nextButton.classList.add("pagination-btn");
    nextButton.href = "#";
    nextButton.disabled = currentPage === pageCount;
    nextButton.addEventListener("click", () => {
      if (currentPage < pageCount) {
        currentPage++;
        displayGrid(currentPage);
        displayPagination(currentPage);
      }
    });
    pagination.appendChild(nextButton);
  }

  // Hiển thị bảng và phân trang lần đầu
  displayGrid(currentPage);
  displayPagination(currentPage);
}

// Hàm tìm kiếm sản phẩm theo tên và giá
function searchProduct() {
  const children = wrapper.children;
  Array.from(children).forEach((child) => {
    child.classList.remove("hidden");
    if (
      child.tagName !== "HEADER" &&
      child.tagName !== "FOOTER" &&
      !child.classList.contains("search-container")
    ) {
      child.classList.add("hidden");
    }
  });
  const searchTerm = document
    .getElementById("tenSPTim")
    .value.trim()
    .toLowerCase();
  // Lấy danh sách sản phẩm từ localStorage
  const products = JSON.parse(localStorage.getItem("products")) || [];
  let filteredProducts = products;

  if (searchTerm !== "") {
    // Tìm kiếm chỉ theo tên
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    document.getElementById(
      "search-result-category"
    ).innerText = `${searchTerm} (${filteredProducts.length} kết quả)`;
    renderProducts(filteredProducts);
  }
}

function searchProductByPrice() {
  const children = wrapper.children;
  Array.from(children).forEach((child) => {
    child.classList.remove("hidden");
    if (
      child.tagName !== "HEADER" &&
      child.tagName !== "FOOTER" &&
      !child.classList.contains("search-container")
    ) {
      child.classList.add("hidden");
    }
  });
  const searchTerm = document
    .getElementById("tenSPTim")
    .value.trim()
    .toLowerCase();
  const startPrice = document.getElementById("khoangGiaTimBD").value.trim();
  const endPrice = document.getElementById("khoangGiaTimKT").value.trim();
  // Lấy danh sách sản phẩm từ localStorage
  const products = JSON.parse(localStorage.getItem("products")) || [];
  let filteredProducts = products;

  if (searchTerm !== "" && startPrice === "" && endPrice === "") {
    // Tìm kiếm chỉ theo tên
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  } else if (searchTerm === "" && startPrice !== "" && endPrice !== "") {
    // Tìm kiếm chỉ theo giá
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= parseFloat(startPrice) &&
        product.price <= parseFloat(endPrice)
    );
  } else if (searchTerm !== "" && startPrice !== "" && endPrice !== "") {
    // Tìm kiếm theo cả tên và giá
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) &&
        product.price >= parseFloat(startPrice) &&
        product.price <= parseFloat(endPrice)
    );

    document.getElementById(
      "search-result-category"
    ).innerText = `${searchTerm} (${filteredProducts.length} kết quả)`;
    renderProducts(filteredProducts);
  }
}

document.getElementById("sortSelect").addEventListener("change", function () {
  const sortOption = this.value; // Lấy giá trị được chọn
  const products = JSON.parse(localStorage.getItem("products")) || []; // Lấy danh sách sản phẩm

  let sortedProducts = [];

  if (sortOption === "1") {
    // Sắp xếp giá từ cao đến thấp
    sortedProducts = products.sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );
  } else if (sortOption === "2") {
    // Sắp xếp giá từ thấp đến cao
    sortedProducts = products.sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
  }

  // Hiển thị lại danh sách sản phẩm
  renderProducts(sortedProducts);
});
