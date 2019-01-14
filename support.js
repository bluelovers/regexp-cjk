"use strict";
/**
 * Created by user on 2018/3/2/002.
 */
Object.defineProperty(exports, "__esModule", { value: true });
let re = /(wor)(ld)/g;
re.test('hello world!');
// @ts-ignore
exports.leftContext = _multiEqual(RegExp.leftContext, RegExp['$`'], 'hello ');
// @ts-ignore
exports.rightContext = _multiEqual(RegExp.rightContext, RegExp["$'"], '!');
// @ts-ignore
exports.lastParen = _multiEqual(RegExp.lastParen, RegExp["$+"], 'ld');
exports.lastMatch = _multiEqual(RegExp.lastMatch, RegExp["$&"], 'world');
// @ts-ignore
exports.input = _multiEqual(RegExp.input, RegExp["$_"], 'hello world!');
function _multiEqual(a, b, ...argv) {
    if (a === b) {
        if (argv.length) {
            for (let v of argv) {
                if (v !== a) {
                    return false;
                }
            }
        }
        return true;
    }
    return false;
}
exports._multiEqual = _multiEqual;
exports.support = (function () {
    let s = Object.assign({}, exports);
    delete s.default;
    // @ts-ignore
    delete s.support;
    for (let k in s) {
        if (/^_/.test(k)) {
            delete s[k];
        }
    }
    return Object.freeze(s);
})();
exports.default = exports.support;
//console.log(self);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1cHBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILElBQUksRUFBRSxHQUFHLFlBQVksQ0FBQztBQUN0QixFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXhCLGFBQWE7QUFDQSxRQUFBLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbkYsYUFBYTtBQUNBLFFBQUEsWUFBWSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoRixhQUFhO0FBQ0EsUUFBQSxTQUFTLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzlELFFBQUEsU0FBUyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM5RSxhQUFhO0FBQ0EsUUFBQSxLQUFLLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBRTdFLFNBQWdCLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSTtJQUV4QyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQ1g7UUFDQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQ2Y7WUFDQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksRUFDbEI7Z0JBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUNYO29CQUNDLE9BQU8sS0FBSyxDQUFDO2lCQUNiO2FBQ0Q7U0FDRDtRQUVELE9BQU8sSUFBSSxDQUFDO0tBQ1o7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNkLENBQUM7QUFuQkQsa0NBbUJDO0FBRVksUUFBQSxPQUFPLEdBQUcsQ0FBQztJQVF2QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFxQyxDQUFDLENBQUM7SUFDakUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ2pCLGFBQWE7SUFDYixPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFFakIsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQ2Y7UUFDQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ2hCO1lBQ0MsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDWjtLQUNEO0lBRUQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFTCxrQkFBZSxlQUFPLENBQUM7QUFFdkIsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC8zLzIvMDAyLlxuICovXG5cbmxldCByZSA9IC8od29yKShsZCkvZztcbnJlLnRlc3QoJ2hlbGxvIHdvcmxkIScpO1xuXG4vLyBAdHMtaWdub3JlXG5leHBvcnQgY29uc3QgbGVmdENvbnRleHQgPSBfbXVsdGlFcXVhbChSZWdFeHAubGVmdENvbnRleHQsIFJlZ0V4cFsnJGAnXSwgJ2hlbGxvICcpO1xuLy8gQHRzLWlnbm9yZVxuZXhwb3J0IGNvbnN0IHJpZ2h0Q29udGV4dCA9IF9tdWx0aUVxdWFsKFJlZ0V4cC5yaWdodENvbnRleHQsIFJlZ0V4cFtcIiQnXCJdLCAnIScpO1xuLy8gQHRzLWlnbm9yZVxuZXhwb3J0IGNvbnN0IGxhc3RQYXJlbiA9IF9tdWx0aUVxdWFsKFJlZ0V4cC5sYXN0UGFyZW4sIFJlZ0V4cFtcIiQrXCJdLCAnbGQnKTtcbmV4cG9ydCBjb25zdCBsYXN0TWF0Y2ggPSBfbXVsdGlFcXVhbChSZWdFeHAubGFzdE1hdGNoLCBSZWdFeHBbXCIkJlwiXSwgJ3dvcmxkJyk7XG4vLyBAdHMtaWdub3JlXG5leHBvcnQgY29uc3QgaW5wdXQgPSBfbXVsdGlFcXVhbChSZWdFeHAuaW5wdXQsIFJlZ0V4cFtcIiRfXCJdLCAnaGVsbG8gd29ybGQhJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBfbXVsdGlFcXVhbChhLCBiLCAuLi5hcmd2KVxue1xuXHRpZiAoYSA9PT0gYilcblx0e1xuXHRcdGlmIChhcmd2Lmxlbmd0aClcblx0XHR7XG5cdFx0XHRmb3IgKGxldCB2IG9mIGFyZ3YpXG5cdFx0XHR7XG5cdFx0XHRcdGlmICh2ICE9PSBhKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ID0gKGZ1bmN0aW9uICgpOiB7XG5cdHJlYWRvbmx5IGxlZnRDb250ZXh0OiBib29sZWFuO1xuXHRyZWFkb25seSByaWdodENvbnRleHQ6IGJvb2xlYW47XG5cdHJlYWRvbmx5IGxhc3RQYXJlbjogYm9vbGVhbjtcblx0cmVhZG9ubHkgbGFzdE1hdGNoOiBib29sZWFuO1xuXHRyZWFkb25seSBpbnB1dDogYm9vbGVhbjtcbn1cbntcblx0bGV0IHMgPSBPYmplY3QuYXNzaWduKHt9LCBleHBvcnRzIGFzIHR5cGVvZiBpbXBvcnQoJy4vc3VwcG9ydCcpKTtcblx0ZGVsZXRlIHMuZGVmYXVsdDtcblx0Ly8gQHRzLWlnbm9yZVxuXHRkZWxldGUgcy5zdXBwb3J0O1xuXG5cdGZvciAobGV0IGsgaW4gcylcblx0e1xuXHRcdGlmICgvXl8vLnRlc3QoaykpXG5cdFx0e1xuXHRcdFx0ZGVsZXRlIHNba107XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIE9iamVjdC5mcmVlemUocyk7XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0O1xuXG4vL2NvbnNvbGUubG9nKHNlbGYpO1xuIl19