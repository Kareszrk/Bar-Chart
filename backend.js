const pool = createPool({
    host: "HOST_COMES_HERE",
    user: "USERNAME_COMES_HERE",
    password: "PASSWORD_COMES_HERE",
    database: "DATABASE_COMES_HERE",
    connectionLimit: 10
});

router.get('/test2', async(req, res) => {
    await pool2.query(`SELECT SUM(nepesseg)*1000 as nepesseg, orszag FROM orszagok GROUP BY orszag;`, async (err, result, fields) => {
        if(err) throw err;
        let response_orszagok = [], response_nepessegek = [];
        for(let i = 0; i < result.length; i++){
            response_orszagok.push(result[i].orszag);
            response_nepessegek.push(result[i].nepesseg);
        }
        await pool2.query(`SELECT SUM(nepesseg)*1000 as ossznepesseg FROM orszagok;`, async (err, result, fields) => {
        if(err) res.json(err);
        let response = {
            orszagok: response_orszagok,
            nepessegek: response_nepessegek,
            ossznepesseg: result[0].ossznepesseg
        }
        res.json(response);
        });
    });
});