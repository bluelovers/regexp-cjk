"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conv_1 = require("./conv");
const regexp_parser_literal_1 = require("regexp-parser-literal");
const regexp_parser_event_1 = require("regexp-parser-event");
exports.ParserEventEmitter = regexp_parser_event_1.ParserEventEmitter;
exports.ParserEventEmitterEvent = regexp_parser_event_1.ParserEventEmitterEvent;
const regexp_range_1 = require("regexp-range");
const zhTable = require("cjk-conv/lib/zh/table/index");
function coreHandler(str, flags = null, options = {}, ...argv) {
    if (flags !== null && typeof flags == 'object') {
        options = Object.assign({}, flags);
        flags = options.flags || null;
    }
    if (typeof options == 'string') {
        options = {
            skip: options,
        };
    }
    if (typeof options.flags == 'string') {
        flags = options.flags;
    }
    let hasFlags = typeof flags == 'string';
    options = fixOptionsOn(options);
    if (1 && (!options.disableZh || !options.disableLocalRange || options.on)) {
        let ev;
        const zhTableFn = options.zhTable || (options.greedyTable ? conv_1.zhTableAutoGreedyTable : zhTable.auto);
        if (str instanceof RegExp) {
            let ast = regexp_parser_literal_1.parseRegExp(str.toString());
            // @ts-ignore
            ev = new regexp_parser_event_1.ParserEventEmitter(ast);
        }
        else {
            if (options.parseRegularExpressionString && typeof str == 'string') {
                let m = parseRegularExpressionString(str);
                if (m) {
                    str = m.source;
                    flags = hasFlags ? flags : m.flags;
                }
            }
            ev = regexp_parser_event_1.ParserEventEmitter.create(str, flags || '');
        }
        if (!options.disableZh) {
            ev.on(regexp_parser_event_1.ParserEventEmitterEvent.default, function (ast) {
                ast.old_raw = ast.old_raw || ast.raw;
                let raw = conv_1._word_zh_core(ast.raw, options.skip, zhTableFn, options);
                if (ast.raw !== raw) {
                    ast.raw = raw;
                    ev.emit(regexp_parser_event_1.ParserEventEmitterEvent.change, ast);
                }
            });
        }
        if (!options.disableLocalRange) {
            ev.on(regexp_parser_event_1.ParserEventEmitterEvent.class_range, function (ast, ...argv) {
                let s = ast.min.raw;
                let e = ast.max.raw;
                let ret = regexp_range_1.default(s, e, {
                    createRegExpString: true,
                });
                if (ret) {
                    if (options.allowLocalRangeAutoZh) {
                        ret = conv_1._word_zh_core2(ret, options.skip, zhTableFn, options);
                    }
                    ast.old_raw = ast.old_raw || ast.raw;
                    if (ast.raw !== ret) {
                        ast.raw = ret;
                        ev.emit(regexp_parser_event_1.ParserEventEmitterEvent.change, ast);
                    }
                }
            });
        }
        setupParserEventEmitter(ev, options);
        ev.resume();
        str = ev.getSource(!!options.debugChanged
            || !options.noUniqueClass
            || options.sortClass, options);
        flags = hasFlags ? flags : ev.flags;
    }
    else {
        if (options.parseRegularExpressionString && typeof str == 'string') {
            let m = parseRegularExpressionString(str);
            if (m) {
                str = new RegExp(m.source, m.flags);
                flags = hasFlags ? flags : str.flags;
            }
        }
        else if (str instanceof RegExp) {
            str = str.source;
            flags = hasFlags ? flags : str.flags;
        }
    }
    return {
        source: str,
        flags: flags || '',
        options: options,
    };
}
exports.coreHandler = coreHandler;
function parseRegularExpressionString(str) {
    let m = /^([\/#$%])(.+?)\1([a-z]*)$/.exec(str);
    if (m) {
        let [s, d, r, f] = m;
        return {
            source: typeof r !== 'undefined' ? r : '',
            flags: typeof f !== 'undefined' ? f : '',
            slash: s,
            input: str,
        };
    }
    return null;
}
exports.parseRegularExpressionString = parseRegularExpressionString;
function fixOptionsOn(options) {
    if (options.on && !Array.isArray(options.on)) {
        options.on = [options.on];
    }
    // @ts-ignore
    return options;
}
exports.fixOptionsOn = fixOptionsOn;
function setupParserEventEmitter(ev, options) {
    if (options.on) {
        fixOptionsOn(options).on
            .forEach((conf) => {
            Object
                .keys(conf)
                .forEach(function (event) {
                ev.on(event, conf[event]);
            });
        });
    }
    return ev;
}
exports.setupParserEventEmitter = setupParserEventEmitter;
exports.default = coreHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBK0U7QUFDL0UsaUVBQXlFO0FBQ3pFLDZEQUs2QjtBQU1LLDZCQVRqQyx3Q0FBa0IsQ0FTaUM7QUFBM0Msa0NBUlIsNkNBQXVCLENBUVE7QUFMaEMsK0NBQXVDO0FBQ3ZDLHVEQUF3RDtBQStEeEQsU0FBZ0IsV0FBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLFVBQWtDLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFFM0YsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFDOUM7UUFDQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFhLENBQUM7UUFDL0MsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO0tBQzlCO0lBRUQsSUFBSSxPQUFPLE9BQU8sSUFBSSxRQUFRLEVBQzlCO1FBQ0MsT0FBTyxHQUFHO1lBQ1QsSUFBSSxFQUFFLE9BQU87U0FDRCxDQUFDO0tBQ2Q7SUFFRCxJQUFJLE9BQU8sT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQ3BDO1FBQ0MsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7S0FDdEI7SUFFRCxJQUFJLFFBQVEsR0FBRyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUM7SUFFeEMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQ3pFO1FBQ0MsSUFBSSxFQUFzQixDQUFDO1FBRTNCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxD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b3J0IHsgX3dvcmRfemhfY29yZSwgX3dvcmRfemhfY29yZTIsIHpoVGFibGVBdXRvR3JlZWR5VGFibGUgfSBmcm9tICcuL2NvbnYnO1xuaW1wb3J0IHsgSUFzdFRvU3RyaW5nT3B0aW9ucywgcGFyc2VSZWdFeHAgfSBmcm9tICdyZWdleHAtcGFyc2VyLWxpdGVyYWwnO1xuaW1wb3J0IHtcblx0SVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyLFxuXHRQYXJzZXJFdmVudEVtaXR0ZXIsXG5cdFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LFxuXHRJTm9kZUlucHV0LFxufSBmcm9tICdyZWdleHAtcGFyc2VyLWV2ZW50JztcbmltcG9ydCByZWdleHBSYW5nZSBmcm9tICdyZWdleHAtcmFuZ2UnO1xuaW1wb3J0IHpoVGFibGUgPSByZXF1aXJlKCdjamstY29udi9saWIvemgvdGFibGUvaW5kZXgnKTtcbmltcG9ydCB7IGlzUmVnRXhwIH0gZnJvbSAncmVnZXhwLWhlbHBlcic7XG5pbXBvcnQgeyBJT3B0aW9ucyBhcyBJT3B0aW9uc1poVGFibGUgfSBmcm9tICdjamstY29udi9saWIvemgvdGFibGUvaW5kZXgnO1xuXG5leHBvcnQgeyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCwgUGFyc2VyRXZlbnRFbWl0dGVyLCBJTm9kZUlucHV0LCBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXIsIElBc3RUb1N0cmluZ09wdGlvbnMgfVxuXG5leHBvcnQgeyBJT3B0aW9uc1poVGFibGUgfVxuXG5leHBvcnQgdHlwZSBJT3B0aW9uc0NvcmUgPSB7XG5cdHNraXA/OiBzdHJpbmcsXG5cdGRpc2FibGVaaD86IGJvb2xlYW4sXG5cdC8qKlxuXHQgKiBkaXNhYmxlTG9jYWxSYW5nZSBvbmx5IHdvcmsgd2hlbiBkaXNhYmxlWmggaXMgdHJ1ZVxuXHQgKi9cblx0ZGlzYWJsZUxvY2FsUmFuZ2U/OiBib29sZWFuLFxuXHRhbGxvd0xvY2FsUmFuZ2VBdXRvWmg/OiBib29sZWFuLFxuXHRmbGFncz86IHN0cmluZyxcblxuXHQvKipcblx0ICogYWxsb3cgc3RyIGlzIC9hL2dcblx0ICovXG5cdHBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmc/OiBib29sZWFuLFxuXG5cdC8qKlxuXHQgKiDorpMg5paH5a2X5q+U5bCNIOabtOWKoOWvrOmshlxuXHQgKi9cblx0Z3JlZWR5VGFibGU/OiBib29sZWFuIHwgbnVtYmVyLFxuXHR1bnNhZmU/OiBib29sZWFuLFxuXG5cdC8qKlxuXHQgKiBhbGxvdyBzZXQgYENqa0NvbnYuemhUYWJsZS5hdXRvYFxuXHQgKi9cblx0emhUYWJsZT8oY2hhcjogc3RyaW5nLCBvcHRpb25zPzogSU9wdGlvbnNaaFRhYmxlKTogc3RyaW5nW11cblxufSAmIElBc3RUb1N0cmluZ09wdGlvbnM7XG5cbmV4cG9ydCB0eXBlIElPcHRpb25zPFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD4gPSBJT3B0aW9uc0NvcmUgJiB7XG5cdG9uPzogSU9wdGlvbnNPbjxUPiB8IElPcHRpb25zT248VD5bXSxcbn1cblxuZXhwb3J0IHR5cGUgSU9wdGlvbnNSdW50aW1lPFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD4gPSBJT3B0aW9uc0NvcmUgJiB7XG5cdG9uPzogSU9wdGlvbnNPbjxUPltdLFxufVxuXG5leHBvcnQgdHlwZSBJT3B0aW9uc0lucHV0PFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD4gPSBJT3B0aW9uczxUPiB8IElPcHRpb25zUnVudGltZTxUPlxuXG5leHBvcnQgaW50ZXJmYWNlIElDb3JlSGFuZGxlclJldHVybjxUIGV4dGVuZHMgSU5vZGVJbnB1dCA9IElOb2RlSW5wdXQ+XG57XG5cdHNvdXJjZTogc3RyaW5nLFxuXHRmbGFnczogc3RyaW5nLFxuXHRvcHRpb25zOiBJT3B0aW9uc1J1bnRpbWU8VD4sXG59XG5cbmV4cG9ydCB0eXBlIElPcHRpb25zT248VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PiA9IHtcblx0W2sgaW4gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnRdPzogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPFQsIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Pjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcmVIYW5kbGVyKHN0cjogc3RyaW5nIHwgUmVnRXhwLFxuXHRmbGFncz86IHN0cmluZyxcblx0b3B0aW9ucz86IElPcHRpb25zSW5wdXQgfCBzdHJpbmcsXG5cdC4uLmFyZ3Zcbik6IElDb3JlSGFuZGxlclJldHVyblxuZXhwb3J0IGZ1bmN0aW9uIGNvcmVIYW5kbGVyKHN0cjogc3RyaW5nIHwgUmVnRXhwLCBvcHRpb25zPzogSU9wdGlvbnNJbnB1dCwgLi4uYXJndik6IElDb3JlSGFuZGxlclJldHVyblxuZXhwb3J0IGZ1bmN0aW9uIGNvcmVIYW5kbGVyKHN0ciwgZmxhZ3MgPSBudWxsLCBvcHRpb25zOiBJT3B0aW9uc0lucHV0IHwgc3RyaW5nID0ge30sIC4uLmFyZ3YpOiBJQ29yZUhhbmRsZXJSZXR1cm5cbntcblx0aWYgKGZsYWdzICE9PSBudWxsICYmIHR5cGVvZiBmbGFncyA9PSAnb2JqZWN0Jylcblx0e1xuXHRcdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBmbGFncykgYXMgSU9wdGlvbnM7XG5cdFx0ZmxhZ3MgPSBvcHRpb25zLmZsYWdzIHx8IG51bGw7XG5cdH1cblxuXHRpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ3N0cmluZycpXG5cdHtcblx0XHRvcHRpb25zID0ge1xuXHRcdFx0c2tpcDogb3B0aW9ucyxcblx0XHR9IGFzIElPcHRpb25zO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBvcHRpb25zLmZsYWdzID09ICdzdHJpbmcnKVxuXHR7XG5cdFx0ZmxhZ3MgPSBvcHRpb25zLmZsYWdzO1xuXHR9XG5cblx0bGV0IGhhc0ZsYWdzID0gdHlwZW9mIGZsYWdzID09ICdzdHJpbmcnO1xuXG5cdG9wdGlvbnMgPSBmaXhPcHRpb25zT24ob3B0aW9ucyk7XG5cblx0aWYgKDEgJiYgKCFvcHRpb25zLmRpc2FibGVaaCB8fCAhb3B0aW9ucy5kaXNhYmxlTG9jYWxSYW5nZSB8fCBvcHRpb25zLm9uKSlcblx0e1xuXHRcdGxldCBldjogUGFyc2VyRXZlbnRFbWl0dGVyO1xuXG5cdFx0Y29uc3QgemhUYWJsZUZuID0gb3B0aW9ucy56aFRhYmxlIHx8IChvcHRpb25zLmdyZWVkeVRhYmxlID8gemhUYWJsZUF1dG9HcmVlZHlUYWJsZSA6IHpoVGFibGUuYXV0byk7XG5cblx0XHRpZiAoc3RyIGluc3RhbmNlb2YgUmVnRXhwKVxuXHRcdHtcblx0XHRcdGxldCBhc3QgPSBwYXJzZVJlZ0V4cChzdHIudG9TdHJpbmcoKSk7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRldiA9IG5ldyBQYXJzZXJFdmVudEVtaXR0ZXIoYXN0KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGlmIChvcHRpb25zLnBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcgJiYgdHlwZW9mIHN0ciA9PSAnc3RyaW5nJylcblx0XHRcdHtcblx0XHRcdFx0bGV0IG0gPSBwYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKHN0cik7XG5cdFx0XHRcdGlmIChtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0c3RyID0gbS5zb3VyY2U7XG5cdFx0XHRcdFx0ZmxhZ3MgPSBoYXNGbGFncyA/IGZsYWdzIDogbS5mbGFncztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRldiA9IFBhcnNlckV2ZW50RW1pdHRlci5jcmVhdGUoc3RyLCBmbGFncyB8fCAnJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCFvcHRpb25zLmRpc2FibGVaaClcblx0XHR7XG5cdFx0XHRldi5vbihQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5kZWZhdWx0LCBmdW5jdGlvbiAoYXN0KVxuXHRcdFx0e1xuXHRcdFx0XHRhc3Qub2xkX3JhdyA9IGFzdC5vbGRfcmF3IHx8IGFzdC5yYXc7XG5cblx0XHRcdFx0bGV0IHJhdyA9IF93b3JkX3poX2NvcmUoYXN0LnJhdywgKG9wdGlvbnMgYXMgSU9wdGlvbnMpLnNraXAsIHpoVGFibGVGbiwgb3B0aW9ucyBhcyBJT3B0aW9ucyk7XG5cblx0XHRcdFx0aWYgKGFzdC5yYXcgIT09IHJhdylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFzdC5yYXcgPSByYXc7XG5cdFx0XHRcdFx0ZXYuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsIGFzdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICghb3B0aW9ucy5kaXNhYmxlTG9jYWxSYW5nZSlcblx0XHR7XG5cdFx0XHRldi5vbihQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzc19yYW5nZSwgZnVuY3Rpb24gKGFzdCwgLi4uYXJndilcblx0XHRcdHtcblx0XHRcdFx0bGV0IHMgPSBhc3QubWluLnJhdztcblx0XHRcdFx0bGV0IGUgPSBhc3QubWF4LnJhdztcblxuXHRcdFx0XHRsZXQgcmV0ID0gcmVnZXhwUmFuZ2UocywgZSwge1xuXHRcdFx0XHRcdGNyZWF0ZVJlZ0V4cFN0cmluZzogdHJ1ZSxcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChyZXQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAoKG9wdGlvbnMgYXMgSU9wdGlvbnMpLmFsbG93TG9jYWxSYW5nZUF1dG9aaClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXQgPSBfd29yZF96aF9jb3JlMihyZXQsIChvcHRpb25zIGFzIElPcHRpb25zKS5za2lwLCB6aFRhYmxlRm4sIG9wdGlvbnMgYXMgSU9wdGlvbnMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGFzdC5vbGRfcmF3ID0gYXN0Lm9sZF9yYXcgfHwgYXN0LnJhdztcblxuXHRcdFx0XHRcdGlmIChhc3QucmF3ICE9PSByZXQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0YXN0LnJhdyA9IHJldDtcblxuXHRcdFx0XHRcdFx0ZXYuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsIGFzdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzZXR1cFBhcnNlckV2ZW50RW1pdHRlcihldiwgb3B0aW9ucyk7XG5cblx0XHRldi5yZXN1bWUoKTtcblxuXHRcdHN0ciA9IGV2LmdldFNvdXJjZSghIW9wdGlvbnMuZGVidWdDaGFuZ2VkXG5cdFx0XHR8fCAhb3B0aW9ucy5ub1VuaXF1ZUNsYXNzXG5cdFx0XHR8fCBvcHRpb25zLnNvcnRDbGFzc1xuXHRcdFx0LCBvcHRpb25zKTtcblx0XHRmbGFncyA9IGhhc0ZsYWdzID8gZmxhZ3MgOiBldi5mbGFncztcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRpZiAob3B0aW9ucy5wYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nICYmIHR5cGVvZiBzdHIgPT0gJ3N0cmluZycpXG5cdFx0e1xuXHRcdFx0bGV0IG0gPSBwYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKHN0cik7XG5cdFx0XHRpZiAobSlcblx0XHRcdHtcblx0XHRcdFx0c3RyID0gbmV3IFJlZ0V4cChtLnNvdXJjZSwgbS5mbGFncyk7XG5cdFx0XHRcdGZsYWdzID0gaGFzRmxhZ3MgPyBmbGFncyA6IHN0ci5mbGFncztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoc3RyIGluc3RhbmNlb2YgUmVnRXhwKVxuXHRcdHtcblx0XHRcdHN0ciA9IHN0ci5zb3VyY2U7XG5cdFx0XHRmbGFncyA9IGhhc0ZsYWdzID8gZmxhZ3MgOiBzdHIuZmxhZ3M7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRzb3VyY2U6IHN0cixcblx0XHRmbGFnczogZmxhZ3MgfHwgJycsXG5cdFx0b3B0aW9uczogb3B0aW9ucyBhcyBJT3B0aW9uc1J1bnRpbWUsXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcoc3RyOiBzdHJpbmcpXG57XG5cdGxldCBtID0gL14oW1xcLyMkJV0pKC4rPylcXDEoW2Etel0qKSQvLmV4ZWMoc3RyKTtcblx0aWYgKG0pXG5cdHtcblx0XHRsZXQgW3MsIGQsIHIsIGZdID0gbTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRzb3VyY2U6IHR5cGVvZiByICE9PSAndW5kZWZpbmVkJyA/IHIgOiAnJyxcblx0XHRcdGZsYWdzOiB0eXBlb2YgZiAhPT0gJ3VuZGVmaW5lZCcgPyBmIDogJycsXG5cdFx0XHRzbGFzaDogcyxcblx0XHRcdGlucHV0OiBzdHIsXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZml4T3B0aW9uc09uPFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD4ob3B0aW9ucz86IElPcHRpb25zSW5wdXQ8VD4pOiBJT3B0aW9uc1J1bnRpbWU8VD5cbntcblx0aWYgKG9wdGlvbnMub24gJiYgIUFycmF5LmlzQXJyYXkob3B0aW9ucy5vbikpXG5cdHtcblx0XHRvcHRpb25zLm9uID0gW29wdGlvbnMub25dO1xuXHR9XG5cblx0Ly8gQHRzLWlnbm9yZVxuXHRyZXR1cm4gb3B0aW9uc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBQYXJzZXJFdmVudEVtaXR0ZXIoZXY6IFBhcnNlckV2ZW50RW1pdHRlciwgb3B0aW9uczogSU9wdGlvbnNJbnB1dClcbntcblx0aWYgKG9wdGlvbnMub24pXG5cdHtcblx0XHRmaXhPcHRpb25zT24ob3B0aW9ucykub25cblx0XHRcdC5mb3JFYWNoKChjb25mKSA9PlxuXHRcdFx0e1xuXHRcdFx0XHRPYmplY3Rcblx0XHRcdFx0XHQua2V5cyhjb25mKVxuXHRcdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChldmVudDogUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZXYub24oZXZlbnQsIGNvbmZbZXZlbnRdKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdDtcblxuXHRcdFx0fSlcblx0XHQ7XG5cdH1cblxuXHRyZXR1cm4gZXY7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvcmVIYW5kbGVyXG4iXX0=