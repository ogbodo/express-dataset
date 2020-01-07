

function EventRepository(dao) {
    this.dao = dao;
}

EventRepository.prototype.creatEventTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY,
        type TEXT NOT NULL,
        actorId INTEGER NOT NULL,
        repoId INTEGER NOT NULL,
        created_at VARCHAR(100) NOT NULL,
        FOREIGN KEY (actorId) REFERENCES actors(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (repoId) REFERENCES repos(id) ON UPDATE CASCADE ON DELETE CASCADE)`
    return this.dao.run(sql);
}
EventRepository.prototype.create = (eventData) => {
    const { id, type, actorId, repoId, created_at } = eventData;
    return this.dao.run(
        'INSERT INTO events (id, type, actorId, repoId, created_at) VALUES (?,?,?,?,?)',
        [id, type, actorId, repoId, created_at])
}

module.exports = EventRepository;
