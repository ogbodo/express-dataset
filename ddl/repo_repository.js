

function RepoRepository(dao) {
    this.dao = dao;
}

RepoRepository.prototype.creatRepoTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS repos (
        id INTEGER PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        url VARCHAR(100) NOT NULL)`
    return this.dao.run(sql);
}

RepoRepository.prototype.create = (repoData) => {
    const { id, name, url } = repoData;
    return this.dao.run(
        'INSERT INTO repos (id, name, url) VALUES (?,?,?)',
        [id, name, url])
}
module.exports = RepoRepository;
