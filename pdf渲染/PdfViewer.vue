<template>
	<div class="pdf-viewer">
    <div
      ref="pdfContainer"
      class="pdf-page"
    >
    </div>
	</div>
</template>

<script>
// "pdfjs-dist": "2.6.347",
// pdf.worker.min.js 需要放在 static 目录下 worker.js 要求同源
// node_modules/pdfjs-dist/build/pdf.worker.min.js
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/static/js/pdf.worker.min.js';

export default {
  name: 'PdfViewer',
  props: {
    pdfUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      scale: 1,
      pages: [], // 存储 PDF 页数
      renderTasks: [], // 存储 PDF 页数
    };
  },
  mounted() {
  },
  watch: {
    pdfUrl: {
      immediate: true,
      handler(newUrl) {
        this.stopAllRenderTasks();
        console.log('newUrl===>', newUrl);
        if (newUrl) {
          this.loadPdf(newUrl);
        }
      },
    },
  },
  methods: {
    async loadPdf(url) {
      url = '/cms/cmsprod/node/bfs/bfsdoc/' + url;
      try {
        // 使用 PDF.js 加载 PDF 文档
        const pdf = await pdfjsLib.getDocument(url).promise;
        this.pages = new Array(pdf.numPages).fill(null); // 初始化页数
        // 渲染所有页面
        const container = this.$refs.pdfContainer;
        for (let i = 1; i <= pdf.numPages; i++) {
          // 创建 canvas 元素并添加到 DOM
          const canvas = document.createElement('canvas');
          canvas.id = `pageCanvas${i}`;

          const wrapper = document.createElement('div');
          wrapper.appendChild(canvas);
          container.appendChild(wrapper);

          const renderTask = await this.renderPage(pdf, i, canvas, wrapper, container.offsetWidth);
          this.renderTasks.push(renderTask);
          // 渲染页面
          await renderTask.promise;
        }
      } catch (error) {
        console.error('Failed to load PDF:', error);
      }
    },
    async renderPage(pdf, pageNumber, canvas, wrapper, containerWidth) {
      try {
        // 获取 PDF 页面
        const page = await pdf.getPage(pageNumber);
        // 计算缩放比例
        const initialViewport = page.getViewport({ scale: 1 });
        const realScale = containerWidth / initialViewport.width; // 实际缩放比例
        const renderScale = 8; // PDF.js 内部渲染缩放比例
        const displayScale = realScale / renderScale; // 显示缩放比例

        // 设置视图
        const viewport = page.getViewport({ scale: renderScale });

        // 配置 Canvas
        this.configureCanvas(canvas, viewport, displayScale);

        // 配置容器样式
        this.configureWrapper(wrapper, initialViewport, realScale);

        // 渲染页面
        return page.render({
          canvasContext: canvas.getContext('2d'),
          viewport: viewport,
        });
      } catch (error) {
        console.error(`Failed to render page ${pageNumber}:`, error);
      }
    },
    // 配置 Canvas
    configureCanvas(canvas, viewport, displayScale) {
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.transform = `scale(${displayScale})`;
      canvas.style.transformOrigin = '0 0';
    },

    // 配置包装容器样式
    configureWrapper(wrapper, initialViewport, realScale) {
      const scaleWidth = initialViewport.width * realScale;
      const scaleHeight = initialViewport.height * realScale;

      wrapper.className = 'pdf-wrapper';
      wrapper.style.cssText = `
        border: 1px solid #ccc;
        overflow: hidden;
        width: ${scaleWidth}px;
        height: ${scaleHeight}px;
        margin-bottom: 10px;
      `;
    },
    // 清空容器
    stopAllRenderTasks() {
      // 取消所有未完成的渲染任务
      this.renderTasks.forEach((task) => {
        if (task && task.cancel) {
          task.cancel();
        }
      });
      this.renderTasks = [];
      const container = this.$refs.pdfContainer;
      container && (container.innerHTML = '');
    },
  },
};
</script>

<style scoped>
.pdf-viewer {
  overflow: auto;
  padding: 0 10px;
}

.pdf-page {
  margin: 0 auto;
}

.pdf-wrapper {
  overflow: hidden;
}
</style>
