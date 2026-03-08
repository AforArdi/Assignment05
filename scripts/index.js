const allIssuesContainer = document.getElementById('all-issues-container');
const btnAll = document.getElementById('btn-all');
const btnOpen = document.getElementById('btn-open');
const btnClosed = document.getElementById('btn-closed');
let allIssues = [];
let currentTotalIssues = 0;
const issueCount = document.getElementById('issueCount');
const btnSearch = document.getElementById('btn-search');
const spinner = document.getElementById('spinner');

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
    issuesCount(openIssues);
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

// spinner manager
const managerSpinner=(status)=>{
    if(status == true){
        spinner.classList.remove('hidden');
        allIssuesContainer.classList.add('hidden');
    }else{
        allIssuesContainer.classList.remove('hidden');
        spinner.classList.add('hidden');
    }
}


// search related functionality
btnSearch.addEventListener('click', ()=>{
    managerSpinner(true);
    const searchInput = document.getElementById('input-search');
    const searchInputValue = searchInput.value.trim().toLowerCase();
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInputValue}`)
        .then((res)=> res.json())
        .then((data)=>{
            allIssues = data.data;
            displayIssues(allIssues);
            issuesCount(allIssues);
            managerSpinner(false);
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
            <div class="flex items-center gap-2">
                <div class="badge badge-soft badge-success text-[16px] font-bold">${issue.status}</div>
                &bull;
                <p class="text-[#64748B] text-[12px]">Opened by ${issue.author? issue.author : 'Author not Found'}</p>
                &bull;
                <p class="text-[#64748B] text-[12px]">${issue.createdAt}</p>
            </div>
            <div class="flex gap-2">
                <div class="flex gap-2">
                    ${labels}
                </div>
            </div>
            <p class="line-clamp-3 text-[#64748B] text-[16px]">${issue.description}</p>
            <div class=" bg-[#F8FAFC] mx-auto p-4 rounded-md">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-[#64748B] text-[16px]">Assignee:</h2>
                        <p class="font-semibold text-[16px] text-[#1F2937]">${issue.assignee ? issue.assignee : 'Assignee not Found'}</p>
                    </div>
                    <div>
                        <h2 class="text-[#64748B] text-[16px]">Priority:</h2>
                        <div class="badge badge-soft badge-warning text-[16px] font-bold">${issue.priority}</div>
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
    managerSpinner(true);
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const issues = await res.json();
    allIssues = issues.data;
    displayIssues(allIssues);
    managerSpinner(false);
};
// showing loaded issues
const displayIssues=(issues)=>{
    // console.log(issues);
    allIssuesContainer.innerHTML = '';
    issues.forEach(issue => {
        // console.log(issue);
        const issueCard = document.createElement('div');
        // adding top border, based on status
        if(issue.status == 'open'){
            issueCard.classList.add('status-open-border');
        }else{
            issueCard.classList.add('status-closed-border');
        }
        const labels = issue.labels.map(label => {
            return `<div class="badge badge-warning text-[12px] font-medium whitespace-nowrap">${label}</div>`;
        }).join('');

        issueCard.innerHTML = `
            <div onclick="loadForModalClick(${issue.id})" class="card bg-base-100 w-full h-80 shadow-sm cursor-pointer">
                <div class="card-body">
                    <div class="badge badge-soft badge-warning text-[12px] font-medium">${issue.priority}</div>
                    <h2 class="font-semibold text-[14px]">${issue.title}</h2>
                    <p class="line-clamp-3 text-justify text-[12px] text-[#64748B]">${issue.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${labels}
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