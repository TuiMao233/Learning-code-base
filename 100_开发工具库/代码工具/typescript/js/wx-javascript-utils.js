"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawPosterRect = exports.wxPromise = void 0;
var wx = {};
/** 封装所有微信API为promise
 * @param  {string} name wxAPI对应的名称
 * @param  {object} options wxAPI对应的参数
 * @returns {Promise} 返回微信API成功或失败的结果
 * @example const result = await wxPromise('api名称', {配置参数})
 */
exports.wxPromise = function (name, options) {
    if (name === void 0) { name = ""; }
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) {
        wx[name](__assign(__assign({}, options), { success: resolve, fail: reject }));
    });
};
/** 创建绘制海报矩形方法, 自动向画笔添加加载绘制图片方法(ctx.loadDrawImage), 绘制换行字体方法(warpFillText)
 * @param  {string} select_str 查询CSS选择器字符串
 * @returns {node, ctx, rpx} 返回canvas实例, 画笔, 适配值
 * @example const { node, ctx, rpx } = await createDrawPosterRect.build('#canvas')
 */
var DrawPosterRect = /** @class */ (function () {
    function DrawPosterRect(rpx, node, ctx) {
        this.rpx = 0;
        this.node = null;
        this.ctx = null;
        this.rpx = rpx;
        this.node = node;
        this.ctx = ctx;
        this.ctx.loadDrawImage = this.loadDrawImage;
        this.ctx.warpFillText = this.warpFillText;
    }
    /** 构建绘制海报矩形方法, 传入canvas选择器字符串, 返回绘制对象 */
    DrawPosterRect.build = function (select_str) {
        return __awaiter(this, void 0, void 0, function () {
            var rpx, node, ctx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rpx = wx.getSystemInfoSync().windowWidth / 375;
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var query = wx.createSelectorQuery();
                                query.select(select_str)
                                    .node(function (_a) {
                                    var _b = _a.node, node = _b === void 0 ? null : _b;
                                    return resolve(node);
                                })
                                    .exec();
                            })
                            // 获取画笔
                        ];
                    case 1:
                        node = _a.sent();
                        ctx = node.getContext('2d');
                        return [2 /*return*/, new DrawPosterRect(rpx, node, ctx)];
                }
            });
        });
    };
    /** ctx中添加等待绘制图片方法
     * @param  {string} path 本地图片地址(必须)
     * @param  {number} x 绘制x轴位置(必须)
     * @param  {number} y 绘制y轴位置(必须)
     * @param  {number} w 绘制图片宽度(必须)
     * @param  {number} h 绘制图片高度(必须)
     * @returns {Promise} 图片绘制成功时返回true, 需ctx.restore()绘制出实体
     */
    DrawPosterRect.prototype.loadDrawImage = function (path, x, y, w, h) {
        var _a = this, node = _a.node, ctx = _a.ctx;
        return new Promise(function (resolve) {
            var imageObject = node.createImage();
            imageObject.src = path;
            imageObject.onload = function () { ctx.drawImage(imageObject, x, y, w, h); resolve(true); };
        });
    };
    /** ctx中添加绘制换行字体方法
 * @param  {string} text 本地图片地址(必须)
 * @param  {number} maxWidth 绘制换行字体的最大宽度(必须)
 * @param  {number} fontHeight 字体高度(必须)
 * @param  {number} layer 绘制层数(必须)
 * @param  {number} x 绘制x轴位置(必须)
 * @param  {number} y 绘制y轴位置(必须)
 * @returns {null} 无返回值, 需ctx.restore()绘制出实体
 */
    DrawPosterRect.prototype.warpFillText = function (_a) {
        var text = _a.text, maxWidth = _a.maxWidth, fontHeight = _a.fontHeight, layer = _a.layer, x = _a.x, y = _a.y;
        var ctx = this.ctx;
        // timp(判断字符串), row(存入每行的字体), chr(分割每个字的字符串)
        var timp = '', row = [], chr = text.split("");
        for (var i = 0; i < chr.length; i++) {
            // 遍历添加字符串, 如果超出长度, 添加进row数组
            if (ctx.measureText(timp).width < maxWidth)
                timp += chr[i];
            //这里添加了i-- 是为了防止字符丢失
            else {
                i--;
                row.push(timp);
                timp = "";
            }
        }
        if (timp) {
            row.push(timp);
        }
        // 如果数组长度大于2 则截取前两个, 并以...省略
        if (row.length > layer) {
            row = row.slice(0, layer);
            for (var i = 0; i < row[layer - 1].length; i++) {
                if (!(ctx.measureText(row[layer - 1] + '...').width < maxWidth)) {
                    row[layer - 1] = row[layer - 1].slice(0, row[layer - 1].length - 1);
                }
                else {
                    row[layer - 1] += '...';
                    break;
                }
            }
        }
        // 添加绘制信息
        row.forEach(function (item, index) { return ctx.fillText(item, x, y + index * fontHeight); });
    };
    return DrawPosterRect;
}());
exports.DrawPosterRect = DrawPosterRect;
