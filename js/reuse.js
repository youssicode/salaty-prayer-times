export const clearChildren = (target) => {
    while (target.firstChild) {
        target.firstChild.remove()
    }
}