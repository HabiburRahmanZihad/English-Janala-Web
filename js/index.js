const showLoader = () => {
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('loaderhidden').classList.add('hidden');
};
const hideLoader = () => {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('loaderhidden').classList.remove('hidden');
};

const removeActiveClass = () => {
    const activeBtn = document.getElementsByClassName('active');
    for (const btn of activeBtn) {
        btn.classList.remove('active');
    }
};

function getStarted() {
    const pass = document.getElementById('password').value;
    const text = document.getElementById('text').value;
    const numPass = parseInt(pass);

    if (text.length > 0) {
        if (numPass === 123456) {
            alert('Congratulations! You are logged in');
            document.getElementById('showNavbar').style.display = 'block';
            document.getElementById('gayebulHawa').style.display = 'block';
            document.getElementById('bannerGayebulHawa').style.display = 'none';
        } else {
            alert('Please Enter Correct Password');
        }
    }
    else {
        alert('Enter Your Name');
    }

    numPass.value = '';
    text.value = '';
}

const logout = () => {
    // alert('You are logout');
    document.getElementById('showNavbar').style.display = 'none';
    document.getElementById('gayebulHawa').style.display = 'none';
    document.getElementById('bannerGayebulHawa').style.display = 'block';
};

const loadLevelNo = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => {
            loadLessonNo(data.data);
        })
}

const loadLessonId = (id) => {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)

        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedBtn = document.getElementById(`btn-${id}`);
            console.log(clickedBtn);
            clickedBtn.classList.add('active');

            loadVocabulary(data.data);
        })
};

/***
 * {
    "id": 101,
    "level_no": 1,
    "lessonName": "Basic Vocabulary"
}
 */
const loadLessonNo = (numbers) => {

    numbers.forEach(num => {
        const btn = document.getElementById('LoadsevenBtn');

        // console.log(num.level_no);
        const div = document.createElement('div');
        div.innerHTML = `
            <div id="btn-${num.level_no}" onclick="loadLessonId(${num.level_no})"
                class=" btn text-[#422AD5] font-semibold text-xl border border-[#422AD5] hover:bg-[#422AD5] hover:text-white shadow-md">
                <i class="fa-solid fa-book-open"></i> 
                Lesson -${num.level_no}
            </div>
        `;

        btn.appendChild(div);
    });
};

const loadVocabularyDetails = (id) => {
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
        .then(res => res.json())
        .then(data => {
            modalVocabularydetails(data.data);
        })
};

/***
 * {
    "id": 5,
    "level": 1,
    "word": "Eager",
    "meaning": "আগ্রহী",
    "pronunciation": "ইগার"
}
 */

const loadVocabulary = (words) => {
    document.getElementById('hiddenVocalbulary').style.display = 'block';
    document.getElementById('errorMassageHandler').style.display = 'none';

    // console.log(words);
    if (words.length === 0) {
        const vocabulary = document.getElementById('LoadVocabularies');
        vocabulary.innerHTML = '';

        const div = document.createElement('div');
        div.classList.add('col-span-full');
        div.innerHTML = `
        <div class="bg-[#F8F8F8] py-16  w-full rounded-md siliguri space-y-4  flex flex-col items-center ">
        <div>
        <img src="assets/alert-error.png" alt="">
        </div>
        <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <p class="text-[#292524] text-4xl font-medium">নেক্সট Lesson এ যান</p>
        </div>
        `;

        vocabulary.appendChild(div);
        hideLoader();
        return;

    }

    const vocabulary = document.getElementById('LoadVocabularies');
    vocabulary.innerHTML = '';

    words.forEach(word => {
        // console.log(word); 
        // console.log(word.id);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card  bg-base-100 card-xl border p-14 max-h-[400px]">
            <div class="text-center space-y-4">
                <h1 class="text-3xl font-bold">${word.word}</h1>
                <p class="font-medium text-xl">Meaning /Pronounciation</p>
                <p class="siliguri font-semibold text-2xl">"${word.meaning === null || word.meaning === undefined ? "No Word found" : word.meaning} /${word.pronunciation === null || word.pronunciation === undefined ? "No Word found" : word.pronunciation}"</p>
                <div class="flex justify-between items-center mt-4">
                    <p onclick="loadVocabularyDetails(${word.id})" id="details-modal-btn" class="btn"><i class="fa-solid fa-circle-info text-2xl"></i></p>
                    <p id="sound" class="btn"><i class="fa-solid fa-volume-high text-2xl"></i></p>
                </div>
            </div>
        </div>
        `;

        vocabulary.appendChild(div);
    });
    hideLoader();
};

/***
 * {
    "word": "Eager",
    "meaning": "আগ্রহী",
    "pronunciation": "ইগার",
    "level": 1,
    "sentence": "The kids were eager to open their gifts.",
    "points": 1,
    "partsOfSpeech": "adjective",
    "synonyms": [
        "enthusiastic",
        "excited",
        "keen"
    ],
    "id": 5
}
 */
const modalVocabularydetails = (word) => {
    // console.log(word);
    // console.log(word.synonyms);
    document.getElementById('voca_Details').showModal();
    let array = word.synonyms;
    const [a, b, c] = array;

    const modal = document.getElementById('details-container');
    modal.innerHTML = `
    <div class="card bg-base-100 card-lg shadow-sm border-2 mb-10">
        <div class="card-body space-y-5">
            <h2 class="font-semibold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
            <p class="text-2xl font-bold">Meaning</p>
            <p class="siliguri font-medium text-2xl">${word.meaning === null || word.meaning === undefined ? "খুঁজে পাওয়া যায়নি" : word.meaning}</p>
            <p class="text-2xl font-bold">Example</p>
            <p class="text-xl font-normal">${word.sentence}</p>
            <p class="siliguri font-semibold text-2xl">সমার্থক শব্দ গুলো</p>

            <div  class="flex space-x-4">
                <p class="btn siliguri">${a === null || a === undefined ? "খুঁজে পাওয়া যায়নি" : a}</p>
                <p class="btn siliguri">${b === null || b === undefined ? "খুঁজে পাওয়া যায়নি" : b}</p>
                <p class="btn siliguri">${c === null || c === undefined ? "খুঁজে পাওয়া যায়নি" : c}</p>
            </div>

        </div>
    </div>
    `;
};

loadLevelNo();