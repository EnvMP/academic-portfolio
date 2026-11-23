(() => {
  const cards = [...document.querySelectorAll('.work-card')];
  const buttons = [...document.querySelectorAll('.filter')];
  const searchInput = document.querySelector('#search');
  const count = document.querySelector('#visible-count');
  const reset = document.querySelector('#reset');
  const empty = document.querySelector('#empty-state');
  const emptyReset = document.querySelector('#empty-reset');
  let active = 'all';
  function update() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    let n = 0;
    for (const card of cards) {
      const categoryMatch = active === 'all' || card.dataset.category === active;
      const textMatch = !query || card.dataset.search.includes(query);
      card.hidden = !(categoryMatch && textMatch);
      if (!card.hidden) n += 1;
    }
    count.textContent = active === 'all' && !query ? 'Showing all 20 publications' : `Showing ${n} of 20 publications`;
    empty.hidden = n !== 0;
    reset.hidden = active === 'all' && !query;
    buttons.forEach(button => {
      const chosen = button.dataset.filter === active;
      button.classList.toggle('active', chosen);
      button.setAttribute('aria-pressed', String(chosen));
    });
  }
  function clear() { active='all'; searchInput.value=''; update(); }
  buttons.forEach(button => button.addEventListener('click', () => { active=button.dataset.filter; update(); }));
  searchInput.addEventListener('input', update);
  reset.addEventListener('click', clear);
  emptyReset.addEventListener('click', clear);
  update();
})();