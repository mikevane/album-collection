import { useState } from "react";

const initialAlbums = [
  {
    id: 1,
    title: "Come on Over",
    author: "Shania Twain",
    tracks: [
      {
        id: 1,
        name: "You Are Still the One",
        lengthInSecs: 225,
        checked: false,
      },
      { id: 2, name: "Don't Be Stupid", lengthInSecs: 274, checked: false },
      {
        id: 3,
        name: "Man! I Feel Like a Woman!",
        lengthInSecs: 189,
        checked: false,
      },
    ],
  },
  {
    id: 2,
    title: "In Blue",
    author: "The Corrs",
    tracks: [
      { id: 1, name: "Breathless", lengthInSecs: 285, checked: false },
      { id: 2, name: "Give Me a Reason", lengthInSecs: 302, checked: false },
      {
        id: 3,
        name: "Somebody for Someone",
        lengthInSecs: 178,
        checked: false,
      },
      { id: 4, name: "All in a Day", lengthInSecs: 227, checked: false },
    ],
  },
  {
    id: 3,
    title: "Red River Blue",
    author: "Blake Shelton",
    tracks: [
      { id: 1, name: "Honey Bee", lengthInSecs: 210, checked: false },
      { id: 2, name: "Ready to Roll", lengthInSecs: 222, checked: false },
      { id: 3, name: "Good Ole Boys", lengthInSecs: 183, checked: false },
      { id: 4, name: "Sunny in Seattle", lengthInSecs: 194, checked: false },
    ],
  },
];

function App() {
  const [albums, setAlbums] = useState(initialAlbums);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showAddAlbum, setShowAddAlbum] = useState(false);
  const [showAddSong, setShowAddSong] = useState(false);

  function secsToMinsAndSecs(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds - mins * 60;
    let trackTime = [];
    trackTime.push(mins, secs);
    return trackTime;
  }

  function handleShowAddAlbum() {
    setShowAddAlbum((show) => !show);
    setShowAddSong();
  }

  function handleShowAddSong() {
    setShowAddSong((show) => !show);
    setShowAddAlbum();
  }

  return (
    <>
      <Header />
      <Flex
        albums={albums}
        onSetAlbums={setAlbums}
        selectedAlbum={selectedAlbum}
        onSetSelectedAlbum={setSelectedAlbum}
        showAddAlbum={showAddAlbum}
        showAddSong={showAddSong}
        handleShowAddAlbum={handleShowAddAlbum}
        handleShowAddSong={handleShowAddSong}
        secsToMinsAndSecs={secsToMinsAndSecs}
      ></Flex>
      <Totals albums={albums} secsToMinsAndSecs={secsToMinsAndSecs} />
      <Footer />
    </>
  );
}

function Header() {
  return <h1>💿 Album Collection 💿</h1>;
}

function Flex({
  albums,
  onSetAlbums,
  secsToMinsAndSecs,
  selectedAlbum,
  onSetSelectedAlbum,
  handleShowAddAlbum,
  handleShowAddSong,
  showAddAlbum,
  showAddSong,
}) {
  return (
    <div className="flex">
      <AlbumList
        albums={albums}
        onSetAlbums={onSetAlbums}
        secsToMinsAndSecs={secsToMinsAndSecs}
        selectedAlbum={selectedAlbum}
        onSetSelectedAlbum={onSetSelectedAlbum}
        handleShowAddAlbum={handleShowAddAlbum}
      />
      <Album
        selectedAlbum={selectedAlbum}
        onSetSelectedAlbum={onSetSelectedAlbum}
        secsToMinsAndSecs={secsToMinsAndSecs}
        handleShowAddSong={handleShowAddSong}
        onSetAlbums={onSetAlbums}
      />
      {showAddAlbum && (
        <AddAlbum
          onSetAlbums={onSetAlbums}
          handleShowAddAlbum={handleShowAddAlbum}
        />
      )}
      {showAddSong && (
        <AddSong
          handleShowAddSong={handleShowAddSong}
          albums={albums}
          onSetAlbums={onSetAlbums}
          selectedAlbum={selectedAlbum}
          onSetSelectedAlbum={onSetSelectedAlbum}
        />
      )}
    </div>
  );
}

function AlbumList({
  albums,
  secsToMinsAndSecs,
  selectedAlbum,
  onSetSelectedAlbum,
  handleShowAddAlbum,
  onSetAlbums,
}) {
  return (
    <div className="main-component album-list">
      <p>This is your music album collection.</p>
      {albums.map((album) => (
        <AlbumSnippet
          album={album}
          title={album.title}
          author={album.author}
          key={album.id}
          secsToMinsAndSecs={secsToMinsAndSecs}
          selectedAlbum={selectedAlbum}
          onSetSelectedAlbum={onSetSelectedAlbum}
          onSetAlbums={onSetAlbums}
        />
      ))}
      <button className="button" onClick={handleShowAddAlbum}>
        Add Album
      </button>
    </div>
  );
}

function AlbumSnippet({
  title,
  author,
  album,
  secsToMinsAndSecs,
  selectedAlbum,
  onSetSelectedAlbum,
  onSetAlbums,
}) {
  function countTime(input) {
    let counted = [];
    let totalPlaytime;
    input.forEach((track) => {
      let length = track.lengthInSecs;
      counted.push(length);
      totalPlaytime = counted.reduce((a, b) => a + b);
    });
    return totalPlaytime;
  }

  function handleSelection(album) {
    onSetSelectedAlbum((cur) => (cur?.id === album.id ? null : album));
  }

  function deleteAlbum() {
    console.log(album.id);
    onSetAlbums((albums) =>
      albums.filter((album) => album.id !== selectedAlbum?.id)
    );
  }

  const totalPlaytime = countTime(album.tracks);
  const totalPlaytimeConverted = totalPlaytime
    ? secsToMinsAndSecs(totalPlaytime)
    : [0, 0];
  const isSelected = selectedAlbum?.id === album.id;

  return (
    <div
      className={isSelected ? "album selected" : "album"}
      onClick={() => handleSelection(album)}
    >
      <h2>
        💽 {title}
        <button
          className="delete-button"
          value={album.id}
          onClick={() => deleteAlbum()}
          title="Delete this album"
        >
          X
        </button>
      </h2>
      <span className="info">
        Author: <b>{author}</b>
      </span>
      <span className="info">
        Total tracks: <span className="data">{album.tracks.length}</span>
      </span>
      <span className="info">
        Total playtime:{" "}
        <span className="data">
          {totalPlaytimeConverted[0]}:
          {totalPlaytimeConverted[1] < 10
            ? `0${totalPlaytimeConverted[1]}`
            : `${totalPlaytimeConverted[1]}`}
        </span>
      </span>
    </div>
  );
}

function Album({
  selectedAlbum,
  onSetSelectedAlbum,
  secsToMinsAndSecs,
  handleShowAddSong,
  onSetAlbums,
}) {
  const [songsSelected, setSongsSelected] = useState([]);

  if (!selectedAlbum) return;

  function handleChange(e) {
    if (e.target.checked) {
      setSongsSelected((current) => [...current, Number(e.target.value)]);
    } else {
      setSongsSelected(
        songsSelected.filter((item) => item !== Number(e.target.value))
      );
    }
  }

  function deleteSong() {
    onSetAlbums((albums) =>
      albums.map((album) =>
        album.id === selectedAlbum.id
          ? {
              ...album,
              tracks: album.tracks.filter((track) =>
                !songsSelected.includes(track.id) ? track : null
              ),
            }
          : album
      )
    );
    onSetSelectedAlbum(null);
  }

  return (
    <div className="main-component album-detail">
      <h2>{selectedAlbum.title}</h2>
      <ul>
        {selectedAlbum.tracks.map((track, i) => (
          <Song
            track={track}
            key={track.id}
            num={i}
            secsToMinsAndSecs={secsToMinsAndSecs}
            handleChange={handleChange}
            songsSelected={songsSelected}
          />
        ))}
      </ul>
      <button className="button" onClick={handleShowAddSong}>
        Add Song
      </button>
      <button
        className="button"
        onClick={deleteSong}
        title="Delete checked songs"
      >
        Delete checked songs
      </button>
    </div>
  );
}

function Song({ track, num, secsToMinsAndSecs, handleChange }) {
  const songLength = secsToMinsAndSecs(track.lengthInSecs);

  return (
    <div className="song">
      <li>
        🎵 {num < 9 ? `0${num + 1}` : `${num + 1}`}. {track.name} (
        <span className="data">
          {songLength[0]}:
          {songLength[1] < 10 ? `0${songLength[1]}` : `${songLength[1]}`}
        </span>
        )
        <label className="checkbox">
          <input type="checkbox" value={track.id} onChange={handleChange} />
        </label>
      </li>
    </div>
  );
}

function AddAlbum({ onSetAlbums, handleShowAddAlbum }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !author) return;

    const id = crypto.randomUUID();
    const newAlbum = {
      id,
      title,
      author,
      tracks: [],
    };

    handleAddAlbum(newAlbum);

    setTitle("");
    setAuthor("");
    handleShowAddAlbum();
  }

  function handleAddAlbum(album) {
    onSetAlbums((albums) => [...albums, album]);
  }

  return (
    <div className="main-component add-box">
      <form className="form" onSubmit={handleSubmit}>
        <label>Album title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button className="button">Add</button>
      </form>
    </div>
  );
}

function AddSong({
  handleShowAddSong,
  onSetAlbums,
  selectedAlbum,
  onSetSelectedAlbum,
}) {
  const [name, setName] = useState("");
  const [lengthInSecs, setLengthInSecs] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !lengthInSecs) return;

    const id = crypto.randomUUID();
    const newSong = { id, name, lengthInSecs, checked: false };

    handleAddSong(newSong);

    setName("");
    setLengthInSecs("");
    handleShowAddSong();
  }

  function handleAddSong(track) {
    onSetAlbums((albums) =>
      albums.map((album) =>
        album.id === selectedAlbum.id
          ? { ...album, tracks: [...album.tracks, track] }
          : album
      )
    );
    onSetSelectedAlbum(null);
  }

  return (
    <div className="main-component add-box">
      <form className="form" onSubmit={handleSubmit}>
        <label>Song title:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Song length in seconds:</label>
        <input
          type="text"
          value={lengthInSecs}
          onChange={(e) => setLengthInSecs(Number(e.target.value))}
        />
        <button className="button">Add</button>
      </form>
    </div>
  );
}

function Totals({ albums, secsToMinsAndSecs }) {
  function countSongs(input) {
    let counted = [];
    let totalSongs;
    input.forEach((album) => {
      let length = album.tracks.length;
      counted?.push(length);
      totalSongs = counted.reduce((a, b) => a + b);
    });
    return totalSongs;
  }
  const totalSongs = countSongs(albums);

  function countTime(input) {
    let counted = [];
    let totalPlaytime;
    input.forEach((album) => {
      let songs = album.tracks;
      songs.forEach((song) => {
        let duration = song.lengthInSecs;
        counted.push(duration);
        totalPlaytime = counted.reduce((a, b) => a + b);
      });
    });
    return totalPlaytime;
  }
  const totalPlaytime = countTime(albums);

  const collectionPlaytime = secsToMinsAndSecs(totalPlaytime);

  return (
    <div className="main-component">
      <h2>Collection statistics</h2>
      <p>
        Your music collection contains{" "}
        <span className="data">{albums.length}</span> albums and{" "}
        <span className="data">{totalSongs}</span> songs
        <br />
        It has a total playtime of{" "}
        <span className="data">{collectionPlaytime[0]}</span> minutes and{" "}
        <span className="data">{collectionPlaytime[1]}</span> seconds.
      </p>
    </div>
  );
}

function Footer() {
  return <footer>2024 © Michal Vaněk</footer>;
}

export default App;
