const allIssuesContainer = document.getElementById('all-issues-container');
const btnAll = document.getElementById('btn-all');
const btnOpen = document.getElementById('btn-open');
const btnClosed = document.getElementById('btn-closed');
let allIssues = [];
let currentTotalIssues = 0;
const issueCount = document.getElementById('issueCount');
const btnSearch = document.getElementById('btn-search');

const issuesCount=(arr)=>{
    currentTotalIssues = arr.length;
    // console.log(currentTotalIssues);
    issueCount.textContent = currentTotalIssues;

}

// btn related functions
const removeActiveClass=()=>{
    const allBtn = document.querySelectorAll('.all-btn, button');
    allBtn.forEach((btn)=> {
        // console.log(btn);
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
    });
}
const setActiveBtn=(btn)=>{
    removeActiveClass();
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-outline');
}
// showing specific issues based on button click
btnAll.addEventListener('click', () => {
    setActiveBtn(btnAll);
    displayIssues(allIssues);
    issuesCount(allIssues);
});
btnOpen.addEventListener('click', () => {
    setActiveBtn(btnOpen);
    const openIssues = allIssues.filter(issue => issue.status === 'open');
    displayIssues(openIssues);
    issuesCount(openIssues)
});
btnClosed.addEventListener('click', () => {
    setActiveBtn(btnClosed);
    const closedIssues = allIssues.filter(issue => issue.status === 'closed');
    displayIssues(closedIssues);
    issuesCount(closedIssues);
});

// fetch('https://openapi.programming-hero.com/api/words/all')
//     .then((res)=> res.json())
//     .then((data)=> {
//         const allWords = data.data;
//         const filteredWords = allWords.filter((word)=>
//             word.word.toLowerCase().includes(inputValue)
//         );
//         displayWord(filteredWords);
//     })

// search related functionality
btnSearch.addEventListener('click', ()=>{
    const searchInput = document.getElementById('input-search');
    const searchInputValue = searchInput.value.trim().toLowerCase();
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInputValue}`)
        .then((res)=> res.json())
        .then((data)=>{
            allIssues = data.data;
            displayIssues(allIssues);
            issuesCount(allIssues);
        })
})
// modal loading data and showing data related functionaltiy
const loadForModalClick=async(id)=>{
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const data = await res.json();
    displayForModalClick(data.data);
}
const displayForModalClick=(issue)=>{
    // console.log(issue.data);
    const modalDetailsContainer = document.getElementById('modal-details-container');
    const labels = issue.labels.map(label => {
        return `<div class="badge badge-warning text-[12px] font-medium whitespace-nowrap">${label}</div>`;
    }).join('');
    
    modalDetailsContainer.innerHTML = `
        <h3 class="text-lg font-bold">${issue.title}</h3>
            <div class="flex gap-2">
                <div class="badge badge-soft badge-success text-[12px] font-medium">${issue.status}</div>
                &bull;
                <p>Opened by ${issue.author}</p>
                &bull;
                <p>${issue.createdAt}</p>
            </div>
            <div class="flex gap-2">
                <div class="flex gap-2">
                    ${labels}
                </div>
            </div>
            <p class="line-clamp-3">${issue.description}</p>
            <div class=" bg-[#F8FAFC] mx-auto p-4 rounded-md">
                <div class="flex justify-between items-center">
                    <div>
                        <h2>Assignee:</h2>
                        <p>${issue.assignee}</p>
                    </div>
                    <div>
                        <h2>Priority:</h2>
                        <div class="badge badge-soft badge-warning text-[12px] font-medium">${issue.priority}</div>
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary">Close</button>
                </form>
            </div>
    `;
    document.getElementById('my_modal_1').showModal();
}


// loading all isues from API
const loadIssues = async ()=>{
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const issues = await res.json();
    allIssues = issues.data;
    displayIssues(allIssues);
};
// showing loaded issues
const displayIssues=(issues)=>{
    // console.log(issues);
    allIssuesContainer.innerHTML = '';
    issues.forEach(issue => {
        // console.log(issue);
        const issueCard = document.createElement('div');
        const labels = issue.labels.map(label => {
            return `<div class="badge badge-warning text-[12px] font-medium whitespace-nowrap">${label}</div>`;
        }).join('');

        issueCard.innerHTML = `
            <div onclick="loadForModalClick(${issue.id})" class="card bg-base-100 w-72 h-70 shadow-sm cursor-pointer">
                <div class="card-body">
                    <div class="badge badge-soft badge-warning text-[12px] font-medium">${issue.priority}</div>
                    <h2 class="font-semibold text-[14px]">${issue.title}</h2>
                    <p class="line-clamp-3 text-justify text-[12px] text-[#64748B]">${issue.description}</p>
                    <div class="flex gap-2">
                        <div class="flex gap-2">
                            ${labels}
                        </div>
                    </div>
                    <hr>
                    <p class="text-[12px] text-[#64748B]">#${issue.id} by ${issue.author}</p>
                    <p class="text-[12px] text-[#64748B]">${issue.createdAt}</p>
                </div>
            </div>
        `;
        allIssuesContainer.append(issueCard);
    });
}


loadIssues();