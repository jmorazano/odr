$('#search-input').on('input', (e) => {
  const searchValue = e.target.value;

  // Loop through the comment list
  $('.company-list__item').each(function () {
    // If the list item does not contain the text phrase fade it out
    if (
      $(this)
        .text()
        .search(new RegExp(searchValue, 'i')) < 0
    ) {
      $(this).fadeOut();

      // Show the list item if the phrase matches and increase the count by 1
    } else {
      $(this).show();
    }
  });
});
