export async function GetItem() {
    try {
        const response = await fetch('https://store.tildacdn.com/api/tgetproduct/');
        const data = await response.json();
        return data;
    } catch(e) {
        console.error(e);
    }
}