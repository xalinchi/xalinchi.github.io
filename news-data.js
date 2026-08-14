// Add new items at the TOP. Homepage shows latest five automatically.
window.NEWS=[{"date":"2026","category":"Service","title":"Selected as a Distinguished TPC Member of IEEE INFOCOM 2026."},{"date":"2026","category":"Honor","title":"Elected Fellow of the British Computer Society (BCS Fellow)."},{"date":"2025","category":"Award","title":"Received the PerCom 2025 Best Demo Award."},{"date":"2025","category":"Career","title":"Appointed Full Professor at Dalian University of Technology."},{"date":"2022","category":"Award","title":"Received the Gold Medal at the Geneva International Exhibition of Inventions."},{"date":"2022","category":"Award","title":"Received the World Internet of Things Awards."},{"date":"2018","category":"Honor","title":"Selected as Young Star of Science and Technology of Dalian."}];

document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('.links');
  if(nav && !nav.querySelector('a[href="research-highlights.html"]')){
    const a=document.createElement('a');
    a.href='research-highlights.html';
    a.textContent='Highlights';
    nav.insertBefore(a,nav.querySelector('a[href="projects.html"]')||nav.firstChild);
  }
});
