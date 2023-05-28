<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-4xl font-bold mb-4">WADUH</h1>
    <button @click="sortByHighestPrice" class="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">Harga Termahal</button>
    <button @click="sortByLowestPrice" class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 ml-2">Harga Termurah</button>
    <button @click="sortByBestRating" class="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 ml-2">Rating Terbaik</button>
    <button @click="showBookmark = !showBookmark" class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Bookmark Manager</button>

<div v-if="showBookmark">
  <div v-if="bookmarkedItems.length > 0">
    <h2 class="text-xl font-bold mb-4">Bookmarks ({{ bookmarkedItems.length }})</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="(item, index) in bookmarkedItems" :key="index" class="bg-gray-100 rounded-md shadow p-4">
        <img :src="images.find((img, i) => i === index)" alt="" class="w-full h-40 object-cover mb-2">
        <p class="font-bold">{{ item.name }}</p>
        <p class="text-gray-500">Rp {{ item.price_amount }}</p>
        <p class="text-gray-500">Stock: {{ item.stock }}</p>
        <p class="text-gray-500">{{ item.sold }}</p>
        <p class="text-gray-500">★{{ item.rating }}</p>
        <button @click="showDetail(item)" class="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">More</button>
      </div>
    </div>
  </div>
</div>


    <textarea
      v-model="transcript"
      rows="5"
      class="w-full p-4 rounded-3xl bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  focus:outline-none "
    >
    </textarea>
    <div class="mt-4 ">
      <button
        @click="startRecording"
        :disabled="isRecording"
        class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Start Recording
      </button>
      <button
        @click="stopRecording"
        :disabled="!isRecording"
        class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Stop Recording
      </button>
      <button @click="removeResult" :disabled="!result" class="bg-gray-500 text-white py-2 px-4 rounded-md cursor-pointer mt-4">Remove</button>
    </div>
    <div v-if="transcript">
      <p class="mb-2"><strong>Transkrip:</strong> {{ transcript }}</p>
      <p class="mb-2"><strong>Label:</strong> {{ label }}</p>
      <p class="mb-2"><strong>Rekomendasi:</strong></p>
      <!-- <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.name }} - {{ item.base_price }}
      </li>
</ul> -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <div v-for="(item, index) in items" :key="index" class="bg-gray-100 rounded-md shadow p-4">
    <img :src="item.thumbnail_image" alt="" class="w-full h-40 object-cover mb-2">
    <p class="font-bold">{{ item.name }}</p>
    <p class="text-gray-500">Rp {{ item.price_amount }}</p>
    <p class="text-gray-500">Stock: {{ item.stock }}</p>
    <p class="text-gray-500">{{ item.sold }}</p>
    <p class="text-gray-500">★{{ item.rating }}</p>
    <button @click="showDetail(item)" class="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">More</button>
  </div>
</div>

<!-- Modal for displaying detail -->
<div v-if="selectedItem" class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">{{ selectedItem.name }}</h3>
            <img :src="selectedItem.thumbnail_image" alt="" class="w-full h-auto object-cover mb-2">
            <p class="text-gray-500 mb-2">Rp {{ selectedItem.price_amount }}</p>
            <p class="text-gray-500">Stock: {{ selectedItem.stock }}</p>
            <p class="text-gray-500">{{ selectedItem.sold }}</p>
            <p class="text-gray-500">★{{ selectedItem.rating }}</p>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <a v-bind:href="'https://www.alodokter.com/aloshop/products/' + selectedItem.name.replace(/\s+/g, '-') + '/' + selectedItem.id" target="_blank" rel="noopener noreferrer" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
  Beli Sekarang
</a>
        <button type="button" @click="selectedItem = null" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Tutup
        </button>
        <button
    type="button"
    @click="toggleBookmark(selectedItem)"
    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
  >
    {{ bookmarkedItems.some((i) => i.id === selectedItem.id) ? 'Unbookmark' : 'Bookmark'}}
  </button>
      </div>
    </div>
  </div>
  
</div>


  </div>



    </div>
  
</template>

<script>
// export default {
//   data() {
//     return {
//       text : '',
//       recognition : null,
//       result : '',
//       selectedLang : 'id-ID',
//       isRecording: false,
//       transcript: "",
//       label : "",
//       recommendations : []
//     };
//   },
//   methods: {
//     onInputChange() {
//       this.result = ''
//     },
//     startRecording() {
//       this.isRecording = true;
//       // Mulai merekam suara
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.lang = "id-ID"
//       recognition.start();
//       // Buat variabel untuk menyimpan instance komponen Vue agar bisa diakses di dalam metode callback
// let vm = this;

// // Panggil API Halodoc untuk mendapatkan rekomendasi obat berdasarkan hasil transkripsi
// fetch('https://magneto.api.halodoc.com/api/v1/buy-medicine/products/search/pilek?page=1&per_page=20' + encodeURIComponent(this.transcript))
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     // Ambil daftar nama obat dari hasil pencarian API dan simpan dalam array recommendations
//     let recommendations = [];
//     for (let i = 0; i < data.length; i++) {
//       recommendations.push(data[i].name);
//     }
//     // Set state recommendations di instance Vue agar bisa ditampilkan pada halaman
//     vm.recommendations = recommendations;
//   });

//       recognition.onresult = event => {
//         this.transcript = event.results[0][0].transcript;
//       };
//       recognition.onend = () => {
//         this.isRecording = false;
//       };
//     },
//     stopRecording() {
//       this.isRecording = false;
//       // Stop merekam suara
//       window.webkitSpeechRecognition.abort();
//     },
//     onRecognitionResult(event) {
//       let result = ''
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         result += event.results[i][0].transcript
//       }
//       this.result = result
//     },
//     removeResult() {
//       this.result = ''
//     }
//   }
// };

export default {
  data() {
    return {
      text : '',
      recognition : null,
      result : '',
      selectedLang : 'id-ID',
      isRecording: false,
      transcript: "",
      label: "",
      names : [],
      base_prices : [],
      items : [],
      images : [],
      selectedItem: null,
      bookmarkedItems: [],
      showBookmark: false, // status tampilan daftar bookmark (default: sembunyikan)
    };
  },

  mounted() {
  const savedBookmarks = localStorage.getItem('bookmarkedItems');
  if (savedBookmarks) {
    this.bookmarkedItems = JSON.parse(savedBookmarks);
  }

  const savedItems = localStorage.getItem('items');
  if (savedItems) {
    this.items = JSON.parse(savedItems);
  }

  const savedSelectedItem = localStorage.getItem('selectedItem');
  if (savedSelectedItem) {
    this.selectedItem = JSON.parse(savedSelectedItem);
  }
},


  methods: {

    showDetail(item) {
      this.selectedItem = item;
    console.log(this.selectedItem)},

    sortByHighestPrice() {
  this.items.sort((a, b) => parseFloat(b.price_amount) - parseFloat(a.price_amount)), parseFloat(b.thumbnail_image) - parseFloat(a.thumbnail_image);
},

sortByLowestPrice() {
  this.items.sort((a, b) => parseFloat(a.price_amount) - parseFloat(b.price_amount));
},

sortByBestRating() {
  return this.items.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
},

toggleBookmark(item) {
      const index = this.bookmarkedItems.findIndex((i) => i.id === item.id);
      if (index > -1) {
        this.bookmarkedItems.splice(index, 1);
      } else {
        this.bookmarkedItems.push(item);
      }

      localStorage.setItem('bookmarkedItems', JSON.stringify(this.bookmarkedItems));
    },
    isBookmarked(item) {
      return this.bookmarkedItems.some((i) => i.id === item.id);
    },

    startRecording() {
      this.isRecording = true;
      // Mulai merekam suara
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = this.selectedLang;
      recognition.start();
      // Buat variabel untuk menyimpan instance komponen Vue agar bisa diakses di dalam metode callback
      let vm = this;



     

  recognition.onresult = event => {
  this.transcript = event.results[0][0].transcript;
  this.items = [];
   // Panggil API Halodoc untuk mendapatkan rekomendasi obat berdasarkan hasil transkripsi
   const q = this.transcript; 
   console.log(this.transcript)
   fetch(`http://localhost:3003/api/search?q=${q}`)
  .then(response => response.json())
  .then(data => {
      const results = data.result.data.map(obj => ({
        name: obj.name,
        id: obj.id,
        thumbnail_image: obj.thumbnail_image,
        rating: obj.rating,
        price_amount: obj.price.amount,
        stock: obj.stock,
        sold: obj.total_product_sold
      }));
      this.items = results;
      this.images = data.result.data.map(obj => obj.thumbnail_image);

  
// for (let i = 0; i < data.length; i++) {
// recommendations.push(data[i].name);
// }
// // Set state recommendations di instance Vue agar bisa ditampilkan pada halaman
// vm.recommendations = recommendations;
console.log(this.items)
});
};

  recognition.onend = () => {
    this.isRecording = false;
  };
},

stopRecording() {
  this.isRecording = false;
},

removeResult() {
  this.result = '';
  this.names = [];
}
}
};
</script>


