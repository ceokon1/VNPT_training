<template>
  <div class="overflow-hidden bg-cover bg-center bg-no-repeat w-full h-screen" style="background-image: url('https://th.bing.com/th/id/OIP.P18rVcY6klv-EzDZfqgWmwHaE7?rs=1&pid=ImgDetMain');">
    <Header />
    <br><br><br><br><br><br>
    <div class="pt-16">
      <div class="flex items-center justify-center h-full px-4">
        <div class="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="relative w-3/5 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1485119584289-30ca2b38c67e?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=');">
            <div class="absolute inset-0 bg-gray-800 bg-opacity-70"></div>
            <div class="relative z-10 flex flex-col justify-end p-8">
              <h2 class="text-yellow-300 text-2xl font-bold">Group 3 - Trao money, nhận !</h2>
              <router-link to="/pages/user/home" class="mt-4">
                <button class="px-6 py-2 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-yellow-300 transition">Trang chủ</button>
              </router-link>
              <h3 class="text-white mt-4">Email</h3>
              <div class="flex items-center mt-2">
                <a href="#" class="text-gray-400 italic">email</a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485.211 485.211" class="w-5 h-5 ml-2 fill-white">
                  <path d="M485.21 363.906c0 10.637-2.99 20.498-7.784 29.174l-153.2-171.41 151.54-132.584c5.894 9.355 9.445 20.344 9.445 32.22v242.6zM242.607 252.793l210.863-184.5c-8.654-4.737-18.398-7.642-28.91-7.642H60.65c-10.523 0-20.27 2.906-28.888 7.643l210.844 184.5zm58.787-11.162l-48.81 42.735c-2.854 2.487-6.41 3.73-9.977 3.73-3.57 0-7.125-1.243-9.98-3.73l-48.82-42.736-155.14 173.6c9.3 5.834 20.198 9.33 31.984 9.33h363.91c11.785 0 22.688-3.496 31.984-9.33l-155.15-173.6zM9.448 89.086C3.554 98.44 0 109.43 0 121.305v242.602c0 10.637 2.978 20.498 7.79 29.174L160.97 221.64 9.448 89.086z" />
                </svg>
              </div>
              <h3 class="text-white mt-4">Connect</h3>
              <div class="flex mt-2">
                <a href="http://instagram.com" target="_blank" rel="noopener noreferrer" class="flex items-center text-gray-400 hover:text-yellow-300 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 fill-current mr-2">
                    <path d="M373.66 0H138.34C62.06 0 0 62.06 0 138.34v235.32C0 449.94 62.06 512 138.34 512h235.32C449.94 512 512 449.94 512 373.66V138.34C512 62.06 449.94 0 373.66 0zm30.676 373.66c0 53.472-43.503 96.976-96.977 96.976H138.34c-53.472 0-96.976-43.503-96.976-96.977V138.34c0-53.472 43.503-96.976 96.977-96.976h235.32c53.472 0 96.976 43.503 96.976 96.977v235.32zM267.79 327.633c-19.404 2.882-38.77-1.973-54.526-13.66-15.757-11.687-26.02-28.81-28.896-48.216-2.878-19.405 1.973-38.77 13.66-54.527 11.688-15.758 28.81-26.02 48.217-28.898 3.574-.53 7.173-.795 10.772-.795s7.2.265 10.773.796c32.23 4.78 57.098 29.645 61.878 61.877 5.94 40.058-21.817 77.482-61.877 83.422zM400.05 111.95c-3.853-3.85-9.184-6.057-14.626-6.057S374.65 108.1 370.8 111.95c-3.852 3.853-6.06 9.175-6.06 14.626 0 5.45 2.208 10.773 6.06 14.625 3.85 3.852 9.182 6.06 14.624 6.06s10.773-2.207 14.625-6.06c3.85-3.85 6.057-9.182 6.057-14.624 0-5.443-2.207-10.774-6.058-14.625z" />
                  </svg>
                </a>
                <a href="http://twitter.com" target="_blank" rel="noopener noreferrer" class="flex items-center text-gray-400 hover:text-yellow-300 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612" class="w-5 h-5 fill-current mr-2">
                    <path d="M612 116.258c-22.525 9.98-46.694 16.75-72.088 19.772 25.93-15.527 45.777-40.155 55.184-69.41-24.322 14.378-51.17 24.82-79.775 30.48-22.906-24.438-55.49-39.66-91.63-39.66-69.333 0-125.55 56.218-125.55 125.514 0 9.828 1.11 19.427 3.25 28.606-104.325-5.24-196.834-55.223-258.75-131.174-10.822 18.51-16.98 40.078-16.98 63.1 0 43.56 22.182 81.994 55.836 104.48-20.575-.688-39.926-6.348-56.867-15.756v1.568c0 60.806 43.29 111.554 100.692 123.104-10.517 2.83-21.607 4.398-33.08 4.398-8.107 0-15.947-.803-23.634-2.333 15.985 49.907 62.336 86.2 117.253 87.194-42.946 33.655-97.098 53.656-155.915 53.656-10.134 0-20.116-.612-29.944-1.72 55.568 35.68 121.537 56.484 192.44 56.484 230.947 0 357.187-191.29 357.187-357.187 0-5.456-.162-10.837-.411-16.205 24.629-17.885 45.973-40.21 62.977-65.774z" />
                  </svg>
                </a>
                <!-- Add more social links as needed -->
              </div>
            </div>
          </div>
          <div class="w-2/5 p-6">
            <h3 class="text-2xl font-semibold mb-2">About Us</h3>
            <p class="text-gray-700">We are a group dedicated to sharing knowledge and building trust in our community. Our mission is to empower individuals through information and resources.</p>
          </div>
        </div>
      </div>
    </div>
    <br><br><br><br><br><br><br><br>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Header from "../../components/user/Header.vue";
import Footer from "../../components/user/Footer.vue";
</script>

<style scoped>

</style>
