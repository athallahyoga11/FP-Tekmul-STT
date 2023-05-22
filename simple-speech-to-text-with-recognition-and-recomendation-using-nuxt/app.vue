<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-4xl font-bold mb-4">Ingpo Obat</h1>
    <select v-model="selectedLang" class="border p-2 mb-4">
      <option value="en-US">English (US)</option>
      <option value="id-ID">Indonesia</option>
    </select>
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
    <img :src="images[index]" alt="" class="w-full h-40 object-cover mb-2">
    <p class="font-bold">{{ item.name }}</p>
    <p class="text-gray-500">Rp {{ item.base_price }}</p>
    <button @click="showDetail(item)" class="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">details</button>
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
            <img :src="selectedItem.image_url" alt="" class="w-full h-auto object-cover mb-2">
            <p class="text-gray-500 mb-2">Rp {{ selectedItem.base_price }}</p>
            <p class="text-gray-500">{{ selectedItem.description }}</p>
            <p class="text-gray-500">{{ selectedItem.rating }}</p>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <a v-bind:href="'https://www.halodoc.com/obat-dan-vitamin/' + selectedItem.name.replace(/\s+/g, '-')" target="_blank" rel="noopener noreferrer" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
  Beli Sekarang
</a>
        <button type="button" @click="selectedItem = null" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Tutup
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
      selectedItem: null
    };
  },
  methods: {

    showDetail(item) {
      this.selectedItem = item;
    console.log(this.selectedItem)},

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
          const results = data.result.map(obj => ({
            name: obj.name,
            base_price: obj.base_price,
            image_url: obj.image_url
          }));
          this.items = results;
          this.images = data.result.map(obj => obj.image_url);
          this.selectedItem = data[0];
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


