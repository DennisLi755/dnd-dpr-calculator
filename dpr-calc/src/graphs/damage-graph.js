import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// X axis would be AC
// let's always assume the data array will be for AC's 10-30
export const DamageGraph = ({damageData, advData, disadvData}) => {
    const data = damageData.map((damage, idx) => {
        return {
            'AC': idx + 10,
            'Normal': damage,
            'Advantage': advData[idx],
            'Disadvantage': disadvData[idx]
        };
    });

    return (
        <LineChart width={800} height={500} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Line type="monotone" dataKey="Advantage" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Normal" stroke="#8884d8" />
            <Line type="monotone" dataKey="Disadvantage" stroke="#ff7300" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="AC" />
            <YAxis />
            <Tooltip />
            <Legend />
        </LineChart>
    );
}