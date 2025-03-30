<template>
  <div>
    <section class="attend-banner relative overflow-hidden">
      <h1
        class="attend-title text-center bg-yellow-400 text-black font-bold py-5 px-4 rounded-lg mb-5"
      >
        Học mọi lúc mọi nơi!
      </h1>
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://i.ytimg.com/vi/Vw6sX_a-xyM/maxresdefault.jpg"
              class="d-block w-full"
              alt="..."
              style="height: 600px;"
            />
            <div class="carousel-caption d-none d-md-block">
              <h1 class="bg-yellow-400 text-black py-2 px-4 rounded-lg max-w-max">
                Cô Vũ Thị Mai Phương
              </h1>
              <h3 class="bg-yellow-400 text-black py-2 px-4 rounded-lg max-w-4xl">
                Nâng cao trình độ ngữ pháp cùng từ vựng!
              </h3>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://mshoagiaotiep.com/uploads/images/resize/900x900/2020/08/lotrinhkhtructuyen.png"
              class="d-block w-full"
              alt="..."
              style="height: 600px;"
            />
            <div class="carousel-caption d-none d-md-block">
              <h1 class="bg-yellow-400 text-black py-2 px-4 rounded-lg max-w-max">
                Cô Nguyễn Minh Hoa
              </h1>
              <h3 class="bg-yellow-400 text-black py-2 px-4 rounded-lg max-w-4xl">
                Kỹ năng giao tiếp linh hoạt!
              </h3>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://i.ytimg.com/vi/3uUa9-LKfcA/maxresdefault.jpg"
              class="d-block w-full"
              alt="..."
              style="height: 600px;"
            />
            <div class="carousel-caption d-none d-md-block">
              <h1 class="bg-yellow-400 text-black py-2 px-4 rounded-lg max-w-max">
                Thầy Lưu Huy Thưởng
              </h1>
              <h3 class="bg-yellow-400 text-black py-2 px-4 rounded-lg max-w-4xl">
                Đạt giải thưởng Giáo viên Quốc Tế và Tin Học Nâng Cao
              </h3>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.attend-banner {
  /* Custom styles can be added here if needed */
  position: relative;
  height: 600px; /* Optional: set a fixed height for the banner */
}

.carousel-inner img {
  transition: transform 0.5s ease; /* Smooth transition for sliding effect */
}
</style>
