import express from 'express';
import {createClient} from '@supabase/supabase-js';
import bodyparse from 'body-parser';
const app = express()

const port = 3000
const supabase = createClient(
    'https://pypcgauqyimtkvxmohug.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cGNnYXVxeWltdGt2eG1vaHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1NTcyMTYsImV4cCI6MTk5MzEzMzIxNn0.JJxaVRzvAA9o8GKiWKZziG5nj5L3DGUDIWjBcZwaDmQ'
    );
app.use(bodyparse.json())
app.use(
    bodyparse.urlencoded({
        extended: true,
    })
)

export default async function search(req, res) {
    // client.query(`Select * from bank_branch where LOWER(branch) like '%${req.query.q.toLowerCase()}%' or lower(address) like '%${req.query.q.toLowerCase()}%' or LOWER(city) like '%${req.query.q.toLowerCase()}%' or LOWER(district) like '%${req.query.q.toLowerCase()}%' or LOWER(states) like '%${req.query.q.toLowerCase()}%' or LOWER(bank_name) like '%${req.query.q.toLowerCase()}%' order by ifsc  limit ${req.query.limit} offset ${req.query.offset}`, (err, result)=>{
    //     if(!err){
    //         res.send(result.rows);
    //     }
        
    // });
    // client.end;
    console.log("hi")
        const {data, error} = await supabase
            .from('Bank')
            .select()
.or(`branch.ilike.%${req.query.q.toLowerCase()}%,city.ilike.%${req.query.q.toLowerCase()}%,district.ilike.%${req.query.q.toLowerCase()}%,state.ilike.%${req.query.q.toLowerCase()}%`)
            .order('ifsc',{ascending:true})
.range(parseInt(req.query.offset),parseInt(req.query.offset)+parseInt(req.query.limit)-1)
        res.send(data)
}



