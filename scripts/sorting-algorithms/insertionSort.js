async function insertionSort(delay) {
    for (i = 1; i < lines.length; i++) {
        if (stop) {
            return;
        }
        let key = lines[i];
        j = i - 1;

        while (j >= 0 && lines[j] > key) {
            document.getElementById(`l${lines[j]}`).className = "selected";
            document.getElementById(`l${lines[j + 1]}`).className = "selected";
            await wait(delay);
            lines[j + 1] = lines[j];
            j--;
            setLinesToContainer(lines);
        }
        lines[j + 1] = key;
        setLinesToContainer(lines);
    }
}