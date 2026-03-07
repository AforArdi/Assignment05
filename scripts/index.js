const allIssuesContainer = document.getElementById('all-issues-container');
const btnAll = document.getElementById('btn-all');
const btnOpen = document.getElementById('btn-open');
const btnClosed = document.getElementById('btn-closed');
let allIssues = [];

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
});

btnOpen.addEventListener('click', () => {
    setActiveBtn(btnOpen);
    const openIssues = allIssues.filter(issue => issue.status === 'open');
    displayIssues(openIssues);
});

btnClosed.addEventListener('click', () => {
    setActiveBtn(btnClosed);
    const closedIssues = allIssues.filter(issue => issue.status === 'closed');
    displayIssues(closedIssues);
});



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
            <div class="card bg-base-100 w-72 h-70 shadow-sm">
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