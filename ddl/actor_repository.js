

function ActorRepository(dao) {
    this.dao = dao;
}

ActorRepository.prototype.creatActorTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS actors (
        id INTEGER PRIMARY KEY,
        login VARCHAR(100) NOT NULL,
        avatar_url VARCHAR(100) NOT NULL)`
    return this.dao.run(sql);
}

ActorRepository.prototype.create = (actorData) => {
    const { id, login, avatar_url } = actorData;
    return this.dao.run(
        'INSERT INTO actors (id, login, avatar_url) VALUES (?,?,?)',
        [id, login, avatar_url])
}

module.exports = ActorRepository;
