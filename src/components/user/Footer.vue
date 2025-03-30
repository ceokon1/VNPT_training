<template>
  <div>
    <footer class="footer" style="margin-top: 30px;">
      <div class="footer-content">
        <div class="footer-left">
          <div class="footer-logo">
            <img
              id="img"
              src="https://static.vecteezy.com/system/resources/previews/009/182/690/original/thi-letter-logo-design-with-polygon-shape-thi-polygon-and-cube-shape-logo-design-thi-hexagon-logo-template-white-and-black-colors-thi-monogram-business-and-real-estate-logo-vector.jpg"
              alt=""
              style="width: 100px; height: 100px; border-radius: 50%;"
            />
            <h1 style="font-weight: 500;">
              OnlineTest - Luyện thi miễn phí.
            </h1>
          </div>
          <p>
            OnlineTest là một hệ thống thi trắc nghiệm trực tuyến linh hoạt và tiện ích.
            Người dùng có thể tạo và tham gia các bài kiểm tra. Hệ thống cung cấp
            các loại câu hỏi đa dạng và tính năng tùy chỉnh, cùng với công cụ quản lý.
            OnlineTest là giải pháp hiệu quả để ôn tập và theo dõi quá trình học tập.
          </p>
          <div class="flogo-list">
            <font-awesome-icon :icon="['fab', 'facebook']" />
            <font-awesome-icon :icon="['fab', 'twitter']" />
            <font-awesome-icon :icon="['fab', 'github']" />
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </div>
        </div>
        <div class="footer-right">
          <table class="ftable">
            <tbody>
              <tr class="ftable-items">
                <th style="text-align: center;">Về OnlineTest</th>
                <th style="text-align: center;">Hỗ trợ</th>
                <th style="text-align: center;">Thông tin khác</th>
              </tr>
              <tr class="ftable-items">
                <td class="ftable-item">
                  <font-awesome-icon :icon="faBuilding" width="20" height="20" /> Group 3
                </td>
                <td class="ftable-item">
                  <font-awesome-icon :icon="faCircleInfo" width="20" height="20" /> Điều khoản
                </td>
                <td class="ftable-item">
                  <font-awesome-icon :icon="faBlog" width="20" height="20" /> Group 3 blog
                </td>
              </tr>
              <tr class="ftable-items">
                <td class="ftable-item">
                  <font-awesome-icon :icon="faUsers" width="20" height="20" /> Tuyển dụng
                </td>
                <td class="ftable-item">
                  <font-awesome-icon :icon="faShieldHalved" width="20" height="20" /> Bảo mật
                </td>
                <td class="ftable-item">
                  <font-awesome-icon :icon="faCircleQuestion" width="20" height="20" /> Thông tin đề thi
                </td>
              </tr>
              <tr class="ftable-items">
                <td class="ftable-item">
                  <font-awesome-icon :icon="faShop" width="20" height="20" /> Group 3 Mall
                </td>
                <td class="ftable-item">
                  <font-awesome-icon :icon="faTruckFast" width="20" height="20" /> Dịch vụ
                </td>
                <td class="ftable-item">
                  <font-awesome-icon :icon="faHandshake" width="20" height="20" /> Cam kết
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr />
      <div class="end">
        <div class="end-left">
          <span>@ 2024 OnlineTest. Created with</span>
          <font-awesome-icon :icon="['fas', 'heart']" style="color: red;" />
          <span>by DatTQ</span>
        </div>
        <div class="end-right">
          <span>Trao tri thức - Nhận niềm tin!</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { faBuilding, faCircleInfo, faBlog, faUsers, faShieldHalved, faCircleQuestion, faShop, faTruckFast, faHandshake, faHeart } from '@fortawesome/free-solid-svg-icons'

// No need to import FontAwesome globally if already done in main.js
</script>

<style scoped>
/* header */
a {
  text-decoration: none;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  background-color: #ffc85b28;
}

/* header */
a {
  text-decoration: none;
}

.header {
  background-color: #fdb44b;
  width: 100%;
  height: 110px;
  display: flex;
  text-align: center;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.header-left {
  padding-top: 16px;
  width: 300px;
  height: 78px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.header-left p {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: 600;
}

.header-mid {
  width: max-content;
  height: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#header-seach {
  width: 500px;
  height: 40px;
  position: relative;
  padding: 10px;
  border-radius: 8px;
  border: white;
}

.icon-seach {
  width: 50px;
  height: 34px;
  position: absolute;
  margin-left: -56px;
  margin-top: 2px;
  border-radius: 5px;
  border: white;
  background-color: #fdb44b;
}

.header-right {
  width: 700px;
  height: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

.header-nav {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  font-weight: 600;
}

.nav-item {
  font-size: 20px;
  color: black;
}

.nav-item:hover {
  color: #f5f5f5;
}

.header .dangnhap {
  width: 150px;
  height: 50px;
  border-radius: 30px;
  background-color: black;
  border: transparent;
  box-shadow: rgba(40, 40, 71, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  color: #f5f5f5;
}

.header .dangnhap:hover {
  background-color: #f8e796;
}

/* Content  */
.main-backgroup {
  position: relative;
  top: 100px;
  width: 100%;
  height: 1440px;
}

.main-subject {
  position: relative;
  top: 50px;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

ul li {
  list-style-type: none;
}

a {
  text-decoration: none;
}

#title-exam {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  text-align: center;
  background-color: gold;
  border-radius: 6px;
  padding: 4px;
}

.perform {
  width: 100%;
  background-color: #ffd27728;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.star {
  color: rgb(253, 198, 0);
  font-size: 22px;
  display: flex;
  gap: 10px;
}

.number-exam {
  width: 100%;
  height: 50px;
}

#number-exam {
  width: max-content;
  height: 50px;
  background-color: black;
  color: white;
  font-weight: 600;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
}

.question-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.Info-detail {
  padding: 10px;
  cursor: pointer;
  display: flex;
  gap: 50px;
}

#img-detail {
  width: 400px;
  border-radius: 10px;
}

.Information-test {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.information {
  width: 80%;
  display: flex;
  gap: 40px;
}

.information .access {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.start-exam {
  width: 100%;
  height: 40px;
  background-color: #ff9a3c;
  color: white;
  font-size: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

#referenceSubject {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.start-exam:hover {
  margin-bottom: 8px;
  margin-left: 8px;
  background: #fdb44b;
  transition: 0.2s;
}

.list-subject {
  position: relative;
  top: 100px;
  width: 100%;
  padding: 20px;
  background-color: #ffd27728;
  margin: auto;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 60px;
  border-radius: 10px;
}

#reference {
  margin: auto;
  background-color: black;
  color: #f5f5f5;
  padding: 10px;
  margin-bottom: -20px;
  border-radius: 8px;
  font-weight: 600;
}

.list-subject a:hover {
  transform: scale(1.1);
}

.subject {
  width: 90%;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  margin: auto;
  display: flex;
  gap: 20px;
}

.Info-subject {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.Info-subject h2 {
  font-size: 25px;
  color: black;
}

#img-small {
  width: 200px;
}

/* footer----------------------- */
.footer {
  padding: 60px 154px 60px 154px;
  background-color: #fdb44b;
  font-family: Arial, Helvetica, sans-serif;
}

.footer .footer-content {
  display: flex;
  gap: 100px;
  margin-bottom: 60px;
}

.footer .footer-content .footer-left {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.footer-content .footer-left p {
  color: black;
}

.footer-content .footer-left .footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: black;
}

.footer-content .footer-left .flogo-list {
  margin-top: -20px;
  font-size: 40px;
  display: flex;
  gap: 10px;
  color: black;
}

.footer-content .footer-right {
  width: 50%;
}

.footer-right .ftable {
  width: 100%;
}

.ftable .ftable-items .ftable-item {
  padding: 20px;
  text-align: center;
  color: black;
}

.ftable .ftable-items {
  color: black;
}

.footer .end {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
}

/* bình luận */
.coment {
  width: 80%;
  margin: auto;
  background-color: #ffd27728;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 20px;
}

.coment1 {
  width: max-content;
  height: 50px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.coment1 img {
  border: 6px solid white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
}

.coment1 p {
  font-size: 20px;
  font-weight: 600;
}

.coment2 {}

#input-comment {
  width: 90%;
  height: 100px;
  outline: transparent;
  border: transparent;
  margin-left: 80px;
  border-radius: 10px;
  padding: 10px;
}

.coment2 #oldComment {
  font-weight: 600;
  width: 100px;
  height: 36px;
  float: right;
  margin-right: 40px;
  background-color: #ff7e67;
  color: #f5f5f5;
  border: #f5f5f5;
  border-radius: 10px;
}

#oldComment:hover {
  background-color: red;
}

.coment3 {
  width: 160px;
  height: 26px;
  border: 0px;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  gap: 3px;
}

.coment4 {
  width: 100%;
  display: none;
}

.coment4 img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.coment4 p {
  font-size: 20px;
}

.commentUser {
  margin-top: 26px;
  display: flex;
  gap: 20px;
}

.userComment {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

#ownOpinion {
  margin-top: 5px;
  width: 80%;
}

.like {
  cursor: pointer;
  display: flex;
  justify-self: center;
  align-items: center;
  gap: 10px;
}

.editComment {
  display: flex;
  gap: 10px;
}

.commentEdit {
  display: none;
  border: 0px;
  background-color: rgb(255, 0, 0);
  border-radius: 10px;
  color: rgb(255, 255, 255);
}

.commentDelete {
  display: none;
  width: 100px;
  border: 0px;
  background-color: rgb(255, 238, 0);
  border-radius: 10px;
  color: rgb(0, 0, 0);
}

#upAndDown {
  transform: rotate(-90deg);
}

#oclockReality {
  color: black;
  margin-top: -22px;
}

.countComment {
  font-size: 20px;
}

#commentLength {
  font-size: 16px;
}

#iconLike {
  font-size: 24px;
}

#updateComment {
  font-weight: 600;
  width: 100px;
  height: 36px;
  float: right;
  margin-right: 40px;
  color: #f5f5f5;
  border: #f5f5f5;
  border-radius: 10px;
  background-color: rgb(106, 165, 17);
  display: none;
}
</style>
