import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

// X axis would be AC
// let's always assume the data array will be for AC's 10-30
export const DamageGraph = ({damageData}) => {
    const data = damageData.map((damage, idx) => {
        return {
            'AC': idx + 10,
            'Damage': damage,
        };
    });

    return (
        <LineChart width={800} height={500} data={data}>
        <Line type="monotone" dataKey="Damage" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="AC" />
        <YAxis />
        </LineChart>
    );
}