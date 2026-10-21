// Add new items at the TOP. Homepage shows latest five automatically.
window.NEWS=[{"date":"2026-10-18","category":"Research","title":"Delivered a keynote address at CCCI 2026, entitled “Contactless Wireless Sensing: Theory, Methodology, and Implementation”."},{"date":"2026-10","category":"Research","title":"Our two papers, AirComm: Your Smartphone Can “Smell” Fine Particles via Light and UOTag: An All-Angle Passive Optical Tag for Underwater Environment, were presented at UbiComp 2026."},{"date":"2026-10","category":"Honor","title":"Named among the World’s Top 2% Scientists by Stanford University and Elsevier for the sixth consecutive year (2021–2026), in the single-year scientific impact ranking."},{"date":"2026-09","category":"Research","title":"Our paper “Minimizing Age of Information by Charger Placement for Battery-Free Sensor Networks” has been accepted by IEEE Transactions on Mobile Computing."},{"date":"2026","category":"Service","title":"Selected as a Distinguished TPC Member of IEEE INFOCOM 2026."},{"date":"2026","category":"Honor","title":"Elected Fellow of the British Computer Society (BCS Fellow)."},{"date":"2025","category":"Award","title":"Received the PerCom 2025 Best Demo Award."},{"date":"2025","category":"Career","title":"Appointed Full Professor at Dalian University of Technology."},{"date":"2022","category":"Award","title":"Received the Gold Medal at the Geneva International Exhibition of Inventions."},{"date":"2022","category":"Award","title":"Received the World Internet of Things Awards."},{"date":"2018","category":"Honor","title":"Selected as Young Star of Science and Technology of Dalian."}];

document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('.links');
  if(nav && !nav.querySelector('a[href="research-highlights.html"]')){
    const a=document.createElement('a');
    a.href='research-highlights.html';
    a.textContent='Highlights';
    nav.insertBefore(a,nav.querySelector('a[href="projects.html"]')||nav.firstChild);
  }
});
