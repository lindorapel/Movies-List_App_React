function Navbar() {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    if (searchQuery.trim() === "") {
      return;
    }
    const searchUrl = `/search?query=${searchQuery}&include_adult=false&page=1`;
    navigate(searchUrl);
  };

  return <div></div>;
}

export default Navbar;
